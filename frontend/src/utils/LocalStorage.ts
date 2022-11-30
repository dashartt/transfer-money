class LocalStorage {
  static get(key: string) {
    const lsObject = localStorage.getItem(key);
    if (lsObject) {
      const parsedObject = JSON.parse(lsObject);
      return parsedObject as unknown;
    }
  }

  static set(key: string, value: unknown) {
    const parsedValue = JSON.stringify(value);
    localStorage.setItem(key, parsedValue);
  }
}

export default LocalStorage;
