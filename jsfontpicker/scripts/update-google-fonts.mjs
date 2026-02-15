#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_FILE = path.join(ROOT_DIR, 'src', 'data', 'fonts', '_googleFonts.txt')
const DIST_FILES = [
  path.join(ROOT_DIR, 'dist', 'fontpicker.js'),
  path.join(ROOT_DIR, 'dist', 'fontpicker.min.js'),
  path.join(ROOT_DIR, 'dist', 'fontpicker.iife.js'),
  path.join(ROOT_DIR, 'dist', 'fontpicker.iife.min.js'),
]
const METADATA_URL = 'https://fonts.google.com/metadata/fonts'

const CATEGORY_MAP = {
  Display: 'display',
  Handwriting: 'handwriting',
  Monospace: 'monospace',
  'Sans Serif': 'sans-serif',
  Serif: 'serif',
}

const CATEGORY_FALLBACK_METRICS = {
  display: { thickness: 3, width: 3, complexity: 3, curvature: 2 },
  handwriting: { thickness: 2, width: 2, complexity: 3, curvature: 4 },
  monospace: { thickness: 2, width: 2, complexity: 1, curvature: 1 },
  'sans-serif': { thickness: 2, width: 2, complexity: 1, curvature: 2 },
  serif: { thickness: 2, width: 2, complexity: 2, curvature: 2 },
}

const normalizeCategory = (category) => {
  if (!category) return 'sans-serif'
  return CATEGORY_MAP[category] ?? category.toLowerCase().replace(/\s+/g, '-')
}

const normalizeSubset = (subset) => {
  if (!subset) return null
  const normalized = subset.toLowerCase().replace(/\s+/g, '-')
  if (normalized === 'menu') return null
  return normalized
}

const normalizeVariants = (fontsMap) => {
  const keys = Object.keys(fontsMap ?? {})
  const variants = []

  for (const key of keys) {
    const match = key.match(/^(\d+)(i?)$/)
    if (!match) continue

    const weight = Number(match[1])
    if (weight < 100 || weight > 900) continue
    if (weight % 100 !== 0) continue

    variants.push(`${weight}${match[2]}`)
  }

  if (!variants.length) return ['400']

  return [...new Set(variants)].sort((a, b) => {
    const aw = Number(a.replace('i', ''))
    const bw = Number(b.replace('i', ''))
    if (aw !== bw) return aw - bw
    if (a.endsWith('i') === b.endsWith('i')) return 0
    return a.endsWith('i') ? 1 : -1
  })
}

const parseExistingCatalog = async () => {
  const map = new Map()
  const raw = (await fs.readFile(SOURCE_FILE, 'utf8')).trim()
  if (!raw) return map

  for (const entry of raw.split('|')) {
    const [name, , , subsets, popularity, thickness, width, complexity, curvature] = entry.split('/')
    if (!name) continue

    const metrics =
      thickness !== undefined &&
      width !== undefined &&
      complexity !== undefined &&
      curvature !== undefined
        ? {
            thickness: Number.parseFloat(thickness),
            width: Number.parseFloat(width),
            complexity: Number.parseFloat(complexity),
            curvature: Number.parseFloat(curvature),
          }
        : null

    const parsedPopularity = Number.parseInt(popularity ?? '', 10)
    map.set(name, {
      popularity: Number.isFinite(parsedPopularity) ? parsedPopularity : null,
      subsets: subsets ? subsets.split(',').filter(Boolean) : [],
      metrics:
        metrics &&
        Number.isFinite(metrics.thickness) &&
        Number.isFinite(metrics.width) &&
        Number.isFinite(metrics.complexity) &&
        Number.isFinite(metrics.curvature)
          ? metrics
          : null,
    })
  }

  return map
}

const fetchMetadata = async () => {
  const response = await fetch(METADATA_URL, {
    headers: { 'user-agent': 'jsfontpicker-updater/1.0' },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status} ${response.statusText}`)
  }
  const text = await response.text()
  const json = text.startsWith(")]}'") ? text.slice(4) : text
  return JSON.parse(json)
}

const buildCatalog = (families, oldCatalog) => {
  const entries = []

  for (const family of families) {
    const name = (family.family ?? '').trim()
    if (!name) continue

    const category = normalizeCategory(family.category)
    const variants = normalizeVariants(family.fonts)
    let subsets = [...new Set((family.subsets ?? []).map(normalizeSubset).filter(Boolean))]

    const oldInfo = oldCatalog.get(name)
    if (!subsets.length) {
      if (oldInfo?.subsets?.length) {
        subsets = [...oldInfo.subsets]
      } else {
        subsets = ['latin']
      }
    }
    const popularity =
      Number.isFinite(family.popularity) && family.popularity > 0
        ? family.popularity
        : oldInfo?.popularity ?? 9999

    const metrics = oldInfo?.metrics ?? CATEGORY_FALLBACK_METRICS[category] ?? CATEGORY_FALLBACK_METRICS['sans-serif']

    entries.push({
      name,
      popularity,
      raw: [
        name,
        category,
        variants.join(','),
        subsets.join(','),
        String(popularity),
        String(metrics.thickness),
        String(metrics.width),
        String(metrics.complexity),
        String(metrics.curvature),
      ].join('/'),
    })
  }

  entries.sort((a, b) => {
    if (a.popularity !== b.popularity) return a.popularity - b.popularity
    return a.name.localeCompare(b.name)
  })

  return entries.map((entry) => entry.raw).join('|')
}

const updateDistBundles = async (catalogText) => {
  const escaped = JSON.stringify(catalogText).slice(1, -1)
  const regex = /const _googleFonts\s*=\s*"[\s\S]*?";/

  for (const file of DIST_FILES) {
    try {
      const original = await fs.readFile(file, 'utf8')
      if (!regex.test(original)) {
        console.warn(`Skipping ${path.basename(file)}: font catalog marker not found.`)
        continue
      }
      const updated = original.replace(regex, `const _googleFonts = "${escaped}";`)
      await fs.writeFile(file, updated)
      console.log(`Updated ${path.relative(ROOT_DIR, file)}`)
    } catch (error) {
      if (error && typeof error === 'object' && error.code === 'ENOENT') {
        console.warn(`Skipping ${path.basename(file)}: file not found.`)
        continue
      }
      throw error
    }
  }
}

const main = async () => {
  const oldCatalog = await parseExistingCatalog()
  const metadata = await fetchMetadata()

  if (!Array.isArray(metadata.familyMetadataList)) {
    throw new Error('Unexpected metadata format: familyMetadataList is missing.')
  }

  const catalogText = buildCatalog(metadata.familyMetadataList, oldCatalog)
  await fs.writeFile(SOURCE_FILE, `${catalogText}\n`)
  await updateDistBundles(catalogText)

  const hasDoto = catalogText.includes('Doto/')
  console.log(`Updated source catalog at ${path.relative(ROOT_DIR, SOURCE_FILE)}`)
  console.log(`Families in catalog: ${metadata.familyMetadataList.length}`)
  console.log(`Contains Doto: ${hasDoto ? 'yes' : 'no'}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
