import pandas as pd
import random

first = "mũ, khăn, áo, quần, giày, gối, chăn, tất, đồng hồ nam, đồng hồ nữ, đồng hồ thời trang"
mid = "xanh, đỏ, tím, vàng, cam, đen, trắng, hồng, hồng cánh sen"
last = ["cá tính", "cực ngầu", "thời thượng", "sành điệu", "đôn chề", "thượng đẳng", "loser"]

id_list = range(1, 1001)

first_list = first.split(", ")
mid_list = mid.split(", ")
last_list = last
#random name from list
names, prices, skus, status, descriptions = [], [], [], [], []
for i in range(1000):
    #random name
    name = random.choice(first_list) + " " + random.choice(mid_list) + " " + random.choice(last_list)
    names.append(name)
    #random price
    price = random.randint(10000, 1000000)
    prices.append(price)

    sku = random.randint(1000000, 9999999)
    skus.append(sku)
    #random status
    st = random.randint(0, 1)
    status.append(st)
    #random description
    description = "màu" + " " + random.choice(mid_list) + " " + random.choice(last_list)
    descriptions.append(description)

tmp = list(zip(id_list, names, prices, skus, status, descriptions))
tmp = pd.DataFrame(tmp, columns=['id', 'name', 'price', 'sku', 'status', 'description'])
tmp.to_csv('product_data.csv', index=False)