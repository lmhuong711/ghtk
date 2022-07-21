var key = 0;
const originData = {
    key: 0,
    data: [],
    search: '',
    newData: null,
};

for (let i = 0; i < 20; i++) {
    key = originData.key;
    originData.data.push({
        key: key,
        msv: 'MSV' + key,
        name: `LMH ${key % 10}`,
        class: `Class no. ${key % 10}`,
    });
    originData.key++;
}

export default originData;