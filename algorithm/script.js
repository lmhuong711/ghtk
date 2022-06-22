const data = [
  { id: 999999, name: 'Phòng to nhất', parentId: null },
  { id: 1, name: 'GHTK', parentId: 999999 },
  { id: 11, name: 'Phòng CNTT', parentId: 1 },
  { id: 111, name: 'Nhóm 1', parentId: 11 },
  { id: 112, name: 'Nhóm 2', parentId: 11 },
  { id: 12, name: 'Phòng KT', parentId: 1 },
  { id: 121, name: 'Nhóm 1', parentId: 12 },
  { id: 122, name: 'Nhóm 2', parentId: 12 },
  { id: 2, name: 'FPT', parentId: 999999 },
  { id: 21, name: 'Phòng Giám sát FPT', parentId: 2 },
  { id: 211, name: 'Nhóm 1', parentId: 21 },
  { id: 212, name: 'Nhóm 2', parentId: 21 },
  { id: 22, name: 'Phòng Pháp chế', parentId: 2 },
  { id: 221, name: 'Nhóm 1', parentId: 22 },
  { id: 222, name: 'Nhóm 2', parentId: 22 },
  { id: 3, name: 'VNPAY', parentId: 999999 },
  { id: 31, name: 'Phòng GTGT', parentId: 3 },
  { id: 311, name: 'Nhóm 1', parentId: 31 },
  { id: 312, name: 'Nhóm 2', parentId: 31 },
  { id: 32, name: 'Phòng Vận hành', parentId: 3 },
  { id: 321, name: 'Nhóm 1', parentId: 32 },
  { id: 322, name: 'Nhóm 2', parentId: 32 },
];

const idMapping = data.reduce((acc, el, i) => {
  acc[el.id] = i;
  return acc;
}, {});

console.log(idMapping);

let root;
data.forEach(el => {
  if (el.parentId === null) {
    root = el;
    return;
  }
  const parentEl = data[idMapping[el.parentId]];
  parentEl.children = [...(parentEl.children || []), el];
});

var pdata = document.getElementById("pdata");
pdata.innerHTML = JSON.stringify(root);

console.log(JSON.stringify(root));