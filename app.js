// 課程代碼對應學分
const courseCredits = {
  "AL": 3,
  "ALGO": 3,
  "A&PoCGP": 3,
  "BDAP&A": 3,
  "CAL(I)": 3,
  "CAL(II)": 3,
  "CN": 3,
  "CO&A": 3,
  "CO&AL": 3,
  "CC": 3,
  "CP(I)": 3,
  "CP(II)": 3,
  "D&IoIoTA": 3,
  "DLD": 2,
  "DLDL": 2,
  "DC": 3,
  "DM": 3,
  "DMining": 3,
  "DRSocD": 3, 
  "DS": 3, 
  "DSD": 3,
  "DSP": 3,
  "DbS": 3,
  "EOS": 3,
  "ESST": 3,
  "FPGAD": 3,
  "H&C": 3,
  "H-cIiES": 3,
  "HDL": 3,
  "HSC": 3,
  "ItoCS": 3,
  "IS": 3,
  "ISP&P": 3,
  "IP":3,
  "ItoAI": 3,
  "ItoES": 3,
  "LA": 3,
  "ML": 3,
  "MDP": 3,
  "MS": 3,
  "NL": 3,
  "NP&P": 3,
  "NSP": 3,
  "OS&SP": 3,
  "OS": 3,
  "OOP": 3,
  "PC": 3,
  "PCP&P": 3,
  "PL": 3,
  "P&PS": 3,
  "P&S": 3,
  "PWS": 3,
  "SE&SS": 3,
  "SoaPCD": 3,
  "S&ITfIA": 3,
  "WN": 3,
  "WP": 3,
  "WPaA": 3
};

// 禁用enter提交
window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

// 禁止所有 button 提交表單
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Select 選擇時改變背景顏色並重新計算 GPA
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

// 調整學分時也要重新計算 GPA
document.querySelectorAll(".class-credits").forEach(credit => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

// 改變選擇顏色
function changeColor(target) {
  const grade = target.value;
  const colorMap = {
    "A": "LightGreen", "A-": "LightGreen",
    "B+": "yellow", "B": "yellow", "B-": "yellow",
    "C+": "orange", "C": "orange", "C-": "orange",
    "D+": "red", "D": "red", "D-": "red",
    "F": "grey"
  };
  target.style.backgroundColor = colorMap[grade] || "white";
  target.style.color = "black";
}

// 等級轉 GPA 分數
function convertor(grade) {
  const gradeMap = {
    "A": 4.0, "A-": 3.7, "B+": 3.4,
    "B": 3.0, "B-": 2.7, "C+": 2.4,
    "C": 2.0, "C-": 1.7, "D+": 1.4,
    "D": 1.0, "D-": 0.7, "F": 0.0
  };
  return gradeMap[grade] ?? 0;
}

// GPA計算方式
function setGPA() {
  let credits = document.querySelectorAll(".class-credits");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;

  for (let i = 0; i < credits.length; i++) {
    let credit = credits[i].valueAsNumber;
    if (!isNaN(credit)) {
      creditSum += credit;
      sum += credit * convertor(selects[i].value);
    }
  }

  let result = creditSum === 0 ? "0.00" : (sum / creditSum).toFixed(2);
  document.getElementById("result-gpa").innerText = result;
}

// plus button
document.querySelector(".plus-btn").addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  let newInput1 = document.createElement("input");
  newInput1.type = "text";
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.type = "text";
  newInput2.classList.add("class-number");
  newInput2.setAttribute("list", "class");

  let newInput3 = document.createElement("input");
  newInput3.type = "number";
  newInput3.min = "0";
  newInput3.max = "6";
  newInput3.classList.add("class-credits");
  newInput3.addEventListener("change", setGPA);

  let newSelect = document.createElement("select");
  newSelect.classList.add("select");

  const grades = ["", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
  grades.forEach(grade => {
    let opt = document.createElement("option");
    opt.value = grade;
    opt.textContent = grade;
    newSelect.appendChild(opt);
  });

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    let form = e.target.closest("form");
    form.style.animation = "scaleDown 0.5s ease forwards";
    form.addEventListener("animationend", () => {
      form.remove();
      setGPA();
    });
  });

  // 自動根據課程代碼補學分
  newInput1.addEventListener("input", () => {
    const courseCode = newInput1.value;
    if (courseCredits[courseCode]) {
      newInput3.value = courseCredits[courseCode];
      setGPA();
    }
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// trash button
document.querySelectorAll(".trash-button").forEach(trash => {
  trash.addEventListener("click", (e) => {
    e.preventDefault();
    let form = e.target.closest("form");
    form.style.animation = "scaleDown 0.5s ease forwards";
    form.addEventListener("animationend", () => {
      form.remove();
      setGPA();
    });
  });
});

// 預設輸入課號時也自動補學分
document.querySelectorAll(".class-type").forEach((input, index) => {
  input.addEventListener("input", () => {
    const courseCode = input.value;
    const creditInput = document.querySelectorAll(".class-credits")[index];
    if (courseCredits[courseCode]) {
      creditInput.value = courseCredits[courseCode];
      setGPA();
    }
  });
});

// datalist filter
document.querySelectorAll(".class-number").forEach(input => {
  input.addEventListener("input", (e) => {
    let filter = e.target.value.toLowerCase();
    document.querySelectorAll("#class option").forEach(option => {
      option.style.display = option.value.toLowerCase().includes(filter) ? "block" : "none";
    });
  });
});

// web introduction
const showAlert = () => {
  Swal.fire({
    icon: 'info',
    title: '網站目的',
    text: '這個網站是用來幫助學生了解各大學院校(美國為主)的 GPA 要求與比較，協助選擇申請方向。',
    confirmButtonText: '了解了！',
    confirmButtonColor: '#3085d6',
  });
};

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSort("descending"); //大到小
});
btn2.addEventListener("click", () => {
  handleSort("ascending"); //小到大
});
function handleSort(direction) {
  const graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  graders.forEach(grader => {
    const [class_type, class_number, class_credit, select] = grader.children;
    if (
      class_type.value !== "" ||
      class_number.value !== "" ||
      class_credit.value !== "" ||
      select.value !== ""
    ) {
      objectArray.push({
        class_name: class_type.value,
        class_number: class_number.value,
        class_credit: class_credit.value,
        class_grade: select.value,
        class_grade_number: convertor(select.value),
      });
    }
  });

  objectArray = mergeSort(objectArray);
  if (direction === "descending") objectArray.reverse();

  const grades = ["", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
  const allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  objectArray.forEach(obj => {
    const form = document.createElement("form");
    const div = document.createElement("div");
    div.classList.add("grader");

    const inputType = document.createElement("input");
    inputType.type = "text";
    inputType.placeholder = "課程";
    inputType.className = "class-type";
    inputType.setAttribute("list", "opt");
    inputType.value = obj.class_name;

    const inputNumber = document.createElement("input");
    inputNumber.type = "text";
    inputNumber.placeholder = "班級";
    inputNumber.className = "class-number";
    inputNumber.setAttribute("list", "class");
    inputNumber.value = obj.class_number;

    const inputCredit = document.createElement("input");
    inputCredit.type = "number";
    inputCredit.placeholder = "學分";
    inputCredit.className = "class-credits";
    inputCredit.min = "0";
    inputCredit.max = "6";
    inputCredit.value = obj.class_credit;

    const select = document.createElement("select");
    select.name = "select";
    select.className = "select";
    grades.forEach(grade => {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      if (obj.class_grade === grade) option.selected = true;
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.className = "trash-button";
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash");
    button.appendChild(icon);

    div.appendChild(inputType);
    div.appendChild(inputNumber);
    div.appendChild(inputCredit);
    div.appendChild(select);
    div.appendChild(button);
    form.appendChild(div);
    allInputs.appendChild(form);
  });


  document.querySelectorAll("select").forEach(select => {
    changeColor(select);
    select.addEventListener("change", e => {
      setGPA();
      changeColor(e.target);
    });
  });

  document.querySelectorAll(".class-credits").forEach(credit => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  document.querySelectorAll(".trash-button").forEach(trash => {
    trash.addEventListener("click", e => {
      e.preventDefault();
      const form = e.target.closest("form");
      form.style.animation = "scaleDown 0.5s ease forwards";
      form.addEventListener("animationend", () => {
        form.remove();
        setGPA();
      });
    });
  });

  document.querySelectorAll(".class-type").forEach((input, index) => {
    input.addEventListener("input", () => {
      const courseCode = input.value;
      const creditInput = document.querySelectorAll(".class-credits")[index];
      if (courseCredits[courseCode]) {
        creditInput.value = courseCredits[courseCode];
        setGPA();
      }
    });
  });

  setGPA(); 
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while ( i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }
  while ( i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while ( j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}