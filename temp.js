function handleSort(direction) {
    let graders = document.querySelectorAll("div.grader");
    let objectArray = [];
  
    for(let i = 0; i < graders.length; i++) {
      let class_name = graders[i].children[0].value; // class category
      let class_number =  graders[i].children[1].value; // class number
      let class_credit = graders[i].children[2].value; // class credit
      let class_grade = graders[i].children[3].value; // class grade
      console.log(class_name, class_number, class_credit, class_grade);
      if (!(class_name == "" && 
        class_number == "" && 
        class_credit == "" && 
        class_grade == "")) {
          let class_object = {
            class_name,
            class_number,
            class_credit,
            class_grade,
          };
          objectArray.push(class_object);
      }
      
      
    }
    // 取得object array後，我們可以把成績String 換成數字
    for (let i = 0; i < objectArray.length;i++) {
      objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
      }
  
      objectArray = mergeSort(objectArray);
      if (direction == "descending") {
        objectArray = objectArray.reverse();
      }
      // 根據 objectArray 的內容， 來更新網頁
      let allInputs = document.querySelector(".all-inputs");
      allInputs.innerHTML = "";
      for (let i = 0; i < objectArray.length; i++) {
        allInputs.innerHTML += `<form>
      <div class="grader"><input type="text" placeholder="課程" class="class-type" list="opt" value = ${objectArray[i].class_name} /><!--
        --><input type="text" placeholder="班級" class="class-number" list="class" ${objectArray[i].class_number} /><!--
        --><input type="number" placeholder="學分" min="0" max="6" class="class-credits" ${objectArray[i].class_credit} /><!--
        --><select name="select" class="select">
          <option value=""></option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="D-">D-</option>
          <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      </form>`;    
      }
  
      //select可直接用js去更改
      graders = document.querySelectorAll("div.grader");
      for (let i = 0; i < graders.length;i++) {
        graders[i].children[3].value = objectArray[i].class_grade;
      }
  
      // select事件監聽
      let allSelect = document.querySelectorAll("select");
      allSelect.forEach(select => {
        changeColor(select);
        select.addEventListener("change", (e) => {
          setGPA();
          changeColor(e.target);
        });
      });
  
      // credit 事件監聽
      let allCredits = document.querySelectorAll(".class-credits");
      allCredits.forEach((credit) => {
        credit.addEventListener("change", () => {
          setGPA();
        })
      })
  
      //垃圾桶 
      let allTrash = document.querySelectorAll(".trash-button");
    allTrash.forEach((trash) => {
      trash.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.style.animation =
          "scaleDown 0.5s ease forwards";
        e.target.parentElement.parentElement.addEventListener(
          "animationend",
          (e) => {
            e.target.remove();
            setGPA();
          }
        );
      });
    });
    
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