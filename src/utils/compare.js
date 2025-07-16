export function compareObjects(obj1, obj2, path = "") {
  const diffs = [];

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    if (obj1 !== obj2) {
      diffs.push(`Difference at '${path || "root"}': ${obj1} !== ${obj2}`);
    }
    return diffs;
  }

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  keys.forEach((key) => {
    const fullPath = path ? `${path}.${key}` : key;
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!(key in obj1)) {
      diffs.push(`Missing key '${fullPath}' in first object`);
      return;
    }
    if (!(key in obj2)) {
      diffs.push(`Missing key '${fullPath}' in second object`);
      return;
    }

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        diffs.push(
          `Difference at '${fullPath}': array length ${val1.length} !== ${val2.length}`
        );
      }
      val1.forEach((item1, index) => {
        const item2 = val2[index];
        diffs.push(...compareObjects(item1, item2, `${fullPath}[${index}]`));
      });
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      diffs.push(...compareObjects(val1, val2, fullPath));
    } else if (val1 !== val2) {
      diffs.push(`Difference at '${fullPath}': ${val1} !== ${val2}`);
    }
  });

  return diffs;
}

export function compareArrays(arr1, arr2) {
  const diffs = [];

  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return ["Both inputs must be arrays."];
  }

  if (arr1.length !== arr2.length) {
    diffs.push(`Different array length: ${arr1.length} !== ${arr2.length}`);
    return diffs;
  }

  arr1.forEach((item1, index) => {
    const item2 = arr2[index];
    const diff = compareObjects(item1, item2, `index[${index}]`);
    if (diff.length > 0) {
      diffs.push(...diff);
    }
  });

  return diffs;
}
