type CnArgumentObject = { [key: string]: unknown }
type CnArgument = undefined | string | CnArgumentObject

const cn = (...classes: CnArgument[]) => {
  return classes.reduce((allClasses: string, currentItem: CnArgument) => {
    if (!!currentItem && typeof currentItem === "object" && currentItem.constructor === Object) {
      Object.keys(currentItem).forEach(className => {
        if (currentItem[className as keyof CnArgumentObject]) {
          allClasses += `${allClasses && ' '}${className}`
        }
      })
      return allClasses
    } else if (typeof currentItem === 'string') {
      return `${allClasses ? allClasses + ' ' : ''}${currentItem}`
    }

    return allClasses
  }, '')
}

export default cn