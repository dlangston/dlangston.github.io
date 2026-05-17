export function assetUrl(pathFromRoot) {
  return new URL(`../../${pathFromRoot}`, import.meta.url).href;
}
