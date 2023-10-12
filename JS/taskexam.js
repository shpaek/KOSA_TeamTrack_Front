function ajaxHandler(method, u, target) {
  console.log(u)

  if (method == 'GET') {
    target.load(u, function (response, status, xhr) { // jQuery용 메소드 load()
      if (status == "error") {
        alert(xhr.status + ShadowRoot.statusText)
      } // inner-if
    })  // .load()
  } // outer-if

}

const backURL = 'http://localhost:8888/KOSA_Project2'

$(() => {
  const taskNo = localStorage.getItem('taskNo')
  console.log(taskNo)

  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    url: `${backURL}/viewtask`,
    method: 'get',
    data: `taskNo=${taskNo}`,
    success: (responseJSONObj) => {
      if (responseJSONObj.status == 0) {
        Swal.fire({
          text: responseJSONObj.msg,
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskboard.html'
          }
        })
      } else if (responseJSONObj.status == 1) {
        const $originObj = $('div.answercontent')
        const cnt = responseJSONObj.answerCnt
        for (var i = 1; i <= cnt; i++) {
          const $divObj = $("<div>")
          const $inputElement1 = $("<input>");
          const $inputElement2 = $("<input>");
          const $inputElement3 = $("<input>");
          const $inputElement4 = $("<input>");

          $inputElement1.attr("type", "radio");
          $inputElement1.attr("name", "a" + i);
          $inputElement1.attr("value", "1")
          $inputElement1.prop('required', true)
          $inputElement2.attr("type", "radio");
          $inputElement2.attr("name", "a" + i);
          $inputElement2.attr("value", "2")
          $inputElement2.prop('required', true)
          $inputElement3.attr("type", "radio");
          $inputElement3.attr("name", "a" + i);
          $inputElement3.attr("value", "3")
          $inputElement3.prop('required', true)
          $inputElement4.attr("type", "radio");
          $inputElement4.attr("name", "a" + i);
          $inputElement4.attr("value", "4")
          $inputElement4.prop('required', true)

          $divObj.append("<br>")
          $divObj.append("Q" + i + " : ")
          $divObj.append("1.")
          $divObj.append($inputElement1)
          $divObj.append(" 2.")
          $divObj.append($inputElement2)
          $divObj.append(" 3.")
          $divObj.append($inputElement3)
          $divObj.append(" 4.")
          $divObj.append($inputElement4)
          $divObj.append("<br><br>")

          $originObj.append($divObj)
        }
      }
    }
  })
  // DOM Tree에서 section 객체 찾기
  const $sectionObj = $(`section.section`)
  $(`nav>a.logo`).click((e) => {
    Swal.fire({
      title: '페이지를 전환하시겠습니까?',
      text: "페이지 전환 시 내용이 저장되지 않습니다",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = '../HTML/main.html'
      } else e.preventDefault()
    })
  })
  // DOM Tree에서 nav>ul>li>a 객체들 찾기
  const $menus = $(`nav>ul.nonHiddenTab>li>a, nav>ul.nonHiddenTab>li>ul>li>a`)

  // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 START 〓〓
  $menus.click((e) => {
    console.log(e.target.className)
    // menu
    switch (e.target.className) { // 화살표 함수 내부에서의 this는 윈도우 객체이기 때문에 e.target 사용!
      case 'teamMainPage':
        Swal.fire({
          title: '페이지를 전환하시겠습니까?',
          text: "페이지 전환 시 내용이 저장되지 않습니다",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './teammain.html'
          }
        })

        break
    }
    e.preventDefault()

  })

  const $taskmenu = $('div.taskboardmenu>ul>li>a')

  $taskmenu.click((e) => {
    switch (e.target.className) {
      case 'maintask':
        Swal.fire({
          title: '페이지를 전환하시겠습니까?',
          text: "페이지 전환 시 내용이 저장되지 않습니다",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskboard.html'
          }
        })

        break
      case 'alltask':
        Swal.fire({
          title: '페이지를 전환하시겠습니까?',
          text: "페이지 전환 시 내용이 저장되지 않습니다",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskall.html'
          }
        })

        break
      case 'completetask':
        Swal.fire({
          title: '페이지를 전환하시겠습니까?',
          text: "페이지 전환 시 내용이 저장되지 않습니다",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskcomplete.html'
          }
        })

        break
      case 'mytask':
        Swal.fire({
          title: '페이지를 전환하시겠습니까?',
          text: "페이지 전환 시 내용이 저장되지 않습니다",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskmy.html'
          }
        })

        break;
    }
    e.preventDefault()
  })

  $('button.taskfiledown').click(() => {
    const $file = $('div.taskinfo>a')

    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: `${backURL}/taskdownload`,
      method: 'get',
      data: `taskNo=${taskNo}`,
      success: (response) => {
        location.href = 'http://localhost:8888/KOSA_Project2/taskdownload?taskNo=' + taskNo
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          text: '다운로드에 실패하였습니다'
        })
      }
    })
  })

  $('form.taskexambox>button').click((e) => {
     
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: `${backURL}/taskdownload`,
      method: 'get',
      data: `taskNo=${taskNo}`,
      success: (responseJSONObj) => {

      }
    })

  })

});