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

  const loginedId = localStorage.getItem("loginedId");
  const taskNo = localStorage.getItem("taskNo")
  // alert(loginedId+", "+taskNo)

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
  const $tasksectionObj = $('section.taskboard')

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

  var asclick = 0
  $('button.answerset').click((e) => {
    if (asclick == 0) {
      var cnt = 1;
      const lastcnt = $('div.answercnt>input[type=number]').val()
      if (lastcnt <= 0) {
        Swal.fire({
          icon: 'warning',
          text: '0보다 큰 값을 설정하세요'
        })
        return
      }

      const $originObj = $('div.taskanswer>div.answer');
      $originObj.append("<br>⌜과제 답안⌟<br><br>")
      $originObj.css('width', '220px')
      if (lastcnt > 3) $originObj.css('height', '300px')
      else $originObj.css('height', 'auto')
      $originObj.css('border', '0.5px solid')
      for (var cnt = 1; cnt <= lastcnt; cnt++) {
        const $divObj = $("<div>")
        const $inputElement1 = $("<input>");
        const $inputElement2 = $("<input>");
        const $inputElement3 = $("<input>");
        const $inputElement4 = $("<input>");

        $inputElement1.attr("type", "radio");
        $inputElement1.attr("name", "a" + cnt);
        $inputElement1.attr("value", "1")
        $inputElement1.prop('required', true)
        $inputElement2.attr("type", "radio");
        $inputElement2.attr("name", "a" + cnt);
        $inputElement2.attr("value", "2")
        $inputElement2.prop('required', true)
        $inputElement3.attr("type", "radio");
        $inputElement3.attr("name", "a" + cnt);
        $inputElement3.attr("value", "3")
        $inputElement3.prop('required', true)
        $inputElement4.attr("type", "radio");
        $inputElement4.attr("name", "a" + cnt);
        $inputElement4.attr("value", "4")
        $inputElement4.prop('required', true)

        $divObj.append("<br>")
        $divObj.append("Q" + cnt + " : ")
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

        asclick = 1;
      }
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: '이미 설정이 완료되었습니다'
      })
      return
    }

  })

  $('button.exitbutton').click((e) => {
    Swal.fire({
      title: '생성을 취소하시겠습니까?',
      text: "취소 시 내용이 저장되지 않습니다",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = './taskboard.html'
      }
    })
  })


  $('button.createbutton').click((e) => {
    const title = $('div.tasktitle>input[type=text]').val()
    const answercnt = $('div.answercnt>input[type=number]').val()
    var answerlist = []

    for (var cnt = 1; cnt <= answercnt; cnt++) {
      $('input[name="a' + cnt + '"]:checked').each(function () {
        answerlist.push($(this).val());
      });
    }

    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: `${backURL}/settask`,
      method: 'get',
      data: `title=${title}&answerList=${answerlist}&taskNo=${taskNo}`,
      success: (responseJSONObj) => {
        e.preventDefault()

        if(responseJSONObj.status==0) {
          Swal.fire({
            icon: 'warning',
            text: responseJSONObj.msg
          }).then((result)=>{
            if(result.isConfirmed) history(-1)
          })
        } else if(responseJSONObj.status==1) {
          Swal.fire({
            icon: 'success',
            text: responseJSONObj.msg
          }).then((result)=>{
            if(result.isConfirmed) location.href='./taskboard.html'
          })
        }
        
      },
      error: () => {
        e.preventDefault()
        Swal.fire({
          icon: 'error',
          text: responseJSONObj.msg
        }).then((result)=>{
          if(result.isConfirmed) location.href='./taskboard.html'
        })

      }

    })
    
    return false


  })


});