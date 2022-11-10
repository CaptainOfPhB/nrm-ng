export const onList = () => {
  console.log('onList');
}

export const onUse = () => {
  console.log('onUse');
}

export const onAdd = (name: string, registry: string) => {
  console.log(name, registry);
}

export const onDelete = (name: string) => {
  console.log('onDelete', name);
}

export const onTest = () => {
  console.log('onTest');
}