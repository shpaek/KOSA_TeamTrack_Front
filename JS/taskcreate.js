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

$(() => {

  const loginedId = localStorage.getItem("loginedId");

    $(`nav>a.logo`).click((e)=>{
        Swal.fire({
            title: '페이지를 전환하시겠습니까?',
            text: "페이지 전환 시 내용이 저장되지 않습니다",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              location.href='../HTML/main.html'
            } else e.preventDefault()
          })
    })

    // DOM Tree에서 nav>ul>li>a 객체들 찾기
    const $menus = $(`nav>ul>li>a, nav>ul>li>ul>li>a`)

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
                          location.href='./teammain.html'
                        }
                      })
                    
                    break
            } 
            e.preventDefault()
    
        }) 

    const $taskmenu = $('div.taskboardmenu>ul>li>a')
    const $tasksectionObj=$('section.taskboard')

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
                        location.href='./taskboard.html'
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
                        location.href='./taskall.html'
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
                        location.href='./taskcomplete.html'
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
                        location.href='./taskmy.html'
                    }
                  })
                
                break;
        }
        e.preventDefault()
    })

    var cnt=1;
    $(`div.addanswer`).click((e)=>{
        const $originObj=$('div.taskanswer>div.answer');
        const $divObj=$("<div>")
        const $inputElement1 = $("<input>");
        const $inputElement2 = $("<input>");
        const $inputElement3 = $("<input>");
        const $inputElement4 = $("<input>");
        const $buttonaddElement = $("<button>");
        $buttonaddElement.append("삭제")
        
        $inputElement1.attr("type", "radio");
        $inputElement1.attr("name", "a"+cnt);
        $inputElement1.attr("value", "1")
        $inputElement2.attr("type", "radio");
        $inputElement2.attr("name", "a"+cnt);
        $inputElement2.attr("value", "2")
        $inputElement3.attr("type", "radio");
        $inputElement3.attr("name", "a"+cnt);
        $inputElement3.attr("value", "3")
        $inputElement4.attr("type", "radio");
        $inputElement4.attr("name", "a"+cnt);
        $inputElement4.attr("value", "4")

        $divObj.append("<br>")
        //$divObj.append(cnt+" : ")
        $divObj.append("1.")
        $divObj.append($inputElement1)
        $divObj.append(" 2.")
        $divObj.append($inputElement2)
        $divObj.append(" 3.")
        $divObj.append($inputElement3)
        $divObj.append(" 4.")
        $divObj.append($inputElement4)
        $divObj.append($buttonaddElement)
        $divObj.append("<br>")

        $buttonaddElement.click(function() {
          $divObj.remove();
        });

        $originObj.append($divObj)
        
        cnt=cnt+1;
        console.log(loginedId)

        
    })


});