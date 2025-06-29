declare module "tailwindcss/lib/util/flattenColorPalette" {
  type ColorValue = string | string[] | { [key: string]: string | string[] };

  const flattenColorPalette: (
    colors: Record<string, ColorValue>
  ) => Record<string, string>;
  export default flattenColorPalette;
}
