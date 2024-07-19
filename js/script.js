let com = document.getElementById("comment");
let naam = document.getElementById("name");
let price = document.getElementById("price");
let dec = document.getElementById("dec");
let cardPrint = document.getElementById("cardPrint");
let isId = false;
let isIndex;

const getData = () => {
  let data = JSON.parse(localStorage.getItem("Data"));

  if (data) {
    return data;
  } else {
    return [];
  }
};
let array = getData();

const create = () => {
  let obj = {
    id: isIndex ? isIndex : Math.floor(Math.random() * 1000),
    com: com.value,
    naam: naam.value,
    price: price.value,
    dec: dec.value,
  };

  if (isId) {
    let editD = [...array];

    let update = editD.map((eeddtt) => {
      if (eeddtt.id == isIndex) {
        return (eeddtt = obj);
      } else {
        return eeddtt;
      }
    });
    array = update;
    isId = false;
    isIndex = undefined;
  } else {
    array = [...array, obj];
  }

  com.value = "";
  naam.value = "";
  price.value = "";
  dec.value = "";

  print();
  localStorage.setItem("Data", JSON.stringify(array));

  return false;
};

const edit = (id) => {
  console.log("id", id);

  let data = [...array];

  let editData = data.filter((edt) => {
    return edt.id == id;
  });

  com.value = editData[0].com;
  naam.value = editData[0].naam;
  price.value = editData[0].price;
  dec.value = editData[0].dec;

  isId = true;
  isIndex = id;
};

const delet = (id) => {
  let data = [...array];

  let deleteData = data.filter((dlt) => {
    return dlt.id != id;
  });

  array = deleteData;
  localStorage.setItem("Data", JSON.stringify(deleteData));
  array = getData();
  print();
};

const print = () => {
  cardPrint.innerHTML = "";

  array.forEach((element) => {
    cardPrint.innerHTML += `
            <div class="card border w-3/12" >
              <img
                src="./Images/20140501-DSC_002711-1-560x400.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title uppercase">${element.naam}</h5>
                <div class="flex justify-between">
                <p class="card-text">
                 ${element.com}
                </p>
                <p class="card-text mr-6">
                 ${element.price}
                </p>
                </div>
                <p class="card-text mr-6">
                 ${element.dec}
                </p>
               <div class="flex w-full justify-between">
              <a  class="btn border bg-secondary-subtle px-3 py-1" onclick="return edit(${element.id})">Edit</a>
              <a class="btn border bg-danger text-white px-4" onclick="return delet(${element.id})">Delete</a>
            </div>
              </div>
            </div>`;
  });
};
print();
