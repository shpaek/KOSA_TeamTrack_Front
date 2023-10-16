const backURL = 'http://192.168.1.20:8888/teamtrack'
$(() => {
  const teamNo = localStorage.getItem('taskteamno')
  const taskNo = localStorage.getItem('taskNo')
  console.log(teamNo)

  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    url: `${backURL}/viewtask`,
    method: 'get',
    data: `teamNo=${teamNo}&taskNo=${taskNo}`,
    success: (responseJSONObj) => {
      if (responseJSONObj.status == 0) {
        Swal.fire({
          text: responseJSONObj.msg,
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = './taskboard.html?teamNo=' + teamNo
          }
        })
      } else if (responseJSONObj.status == 1) {

        if (responseJSONObj.role === 'customer') {
          Swal.fire({
            text: "팀에 가입해주세요",
            icon: 'error'
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = './taskboard.html?teamNo=' + teamNo
            }
          })
        }

        const $originObj = $('div.answercontent')
        const cnt = responseJSONObj.answerCnt
        const title = responseJSONObj.title
        const nickname = responseJSONObj.nickname

        const $origintitleObj = $('form.taskexambox>div.tasktitle')
        const $titleObj = $('<h1>')
        $titleObj.append(title)
        $origintitleObj.append($titleObj)

        const $originnicknameObj = $('div.tasknickname')
        const $nicknameObj = $('<span>')
        $nicknameObj.append(nickname)
        $originnicknameObj.append($nicknameObj)

        localStorage.setItem('answerCnt', cnt)
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
            location.href = './teammain.html?teamNo=' + teamNo + '&id=' + localStorage.getItem('loginedId')
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
            location.href = './taskboard.html?teamNo=' + teamNo
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
            localStorage.setItem("allcp", 1)
            location.href = './taskall.html?teamNo=' + teamNo + '&currentPage=' + 1
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
            localStorage.setItem("completecp", 1)
            location.href = './taskcomplete.html?teamNo=' + teamNo + '&currentPage=' + 1
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
            localStorage.setItem("mycp", 1)
            location.href = './taskmy.html?teamNo=' + teamNo + '&currentPage=' + 1
          }
        })

        break;
    }
    e.preventDefault()
  })

  $('button.taskfiledown').click(() => {

    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: `${backURL}/taskdownload`,
      method: 'get',
      data: `teamNo=${teamNo}&taskNo=${taskNo}`,
      success: (responseData) => {
        if (responseData === "") {
          Swal.fire({
            icon: 'question',
            text: '파일이 존재하지 않습니다'
          })
          return
        } else {
          location.href = backURL + '/taskdownload?teamNo=' + teamNo + '&taskNo=' + taskNo
        }
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

    e.preventDefault();

    const cnt = localStorage.getItem('answerCnt')
    //alert(cnt)
    var answerlist = []
    for (var i = 1; i <= cnt; i++) {
      $('input[name="a' + i + '"]:checked').each(function () {
        answerlist.push($(this).val());
      });
    }

    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: `${backURL}/submittask`,
      method: 'get',
      data: `teamNo=${teamNo}&taskNo=${taskNo}&answerlist=${answerlist}&answerCnt=${cnt}`,
      success: (responseJSONObj) => {
        if (responseJSONObj.status == 0) {
          Swal.fire({
            icon: 'warning',
            text: responseJSONObj.msg
          }).then((result) => {
            if (result.isConfirmed) history(-1)
          })

        } else if (responseJSONObj.status == 1) {
          Swal.fire({
            icon: 'success',
            text: responseJSONObj.msg
          }).then((result) => {
            if (result.isConfirmed) location.href = './taskreview.html'
          })

        }
      },
      error: () => {
        e.preventDefault()

        Swal.fire({
          icon: 'error',
          text: '연결에 실패하였습니다'
        }).then((result) => {
          if (result.isConfirmed) history(-1)
        })
      }
    })

  })

  const $img = $('div.teamProfile img.teamProfileImg')
    $.ajax({
        xhrFields: {
            responseType: "blob",
        },
        url: backURL + "/download",
        data: "teamNo=" + teamNo + "&opt=profile",
        success: (responseData) => {
            if (responseData.size > 0) {
                const url = URL.createObjectURL(responseData);
                $img.attr('src', url)
                $img.parent().show()
            }
        },
        error: (jqxhr) => { },
    });

});