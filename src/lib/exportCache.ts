export function exportCache(value: unknown, indent = 2): string {
  const isValidLuaKey = (key: string): boolean =>
    /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key);

  const escapeString = (s: string): string =>
    `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

  const space = (lvl: number) => " ".repeat(lvl * indent);

  const ignoredKeys = new Set(["name", "license", "category", "notes"]);

  const shouldIgnoreKey = (
    key: string | null,
    lvl: number,
    parentKey: string | null
  ): boolean => {
    if (!key) return false;
    if (key === "default") return true;
    if (ignoredKeys.has(key)) {
      if (key === "name" && !(lvl === 1 && parentKey === null)) return false;
      return true;
    }
    return false;
  };

  const serialize = (
    val: unknown,
    lvl = 0,
    parentKey: string | null = null
  ): string => {
    const pad = space(lvl);
    const padNext = space(lvl + 1);

    if (val === null || val === undefined) return "nil";
    if (typeof val === "boolean") return val ? "true" : "false";
    if (typeof val === "number") return val.toString();
    if (typeof val === "string") return escapeString(val);

    if (Array.isArray(val)) {
      if (val.length === 0) return "{}";
      const serialized = val.map((v, i) => {
        return `${padNext}[${i}] = ${serialize(v, lvl + 1, parentKey)}`;
      });
      return `{\n${serialized.join(",\n")}\n${pad}}`;
    }

    if (typeof val === "object") {
      let entries = Object.entries(val);

      entries = entries.filter(
        ([key]) => !shouldIgnoreKey(key, lvl, parentKey)
      );

      if (entries.length === 0) return "{}";
      return `{\n${entries
        .map(([key, v]) => {
          const safeKey = isValidLuaKey(key) ? key : `["${key}"]`;
          return `${padNext}${safeKey} = ${serialize(v, lvl + 1, key)}`;
        })
        .join(",\n")}\n${pad}}`;
    }

    throw new Error(`Unsupported type: ${typeof val}`);
  };

  return `return ${serialize(value)}\n`;
}
