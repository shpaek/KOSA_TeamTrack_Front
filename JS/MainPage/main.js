const backURL = 'http://localhost:8080/teamtrack'
const frontURL = 'http://localhost:5500/HTML'
$(() => {
    //$('#maincontainer>nav>p').text(sessionStorage.getItem('nickname'))
    $('.membernickname').text(sessionStorage.getItem('nickname'))
    const loginedId = localStorage.getItem("loginedId")
    const $img = $('nav>ul>li>img.profile')
    $img.parent().hide()

       $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: backURL + '/userprofiledownload',
            success: (responseData) => {
                if (responseData.size > 0) {
                    const url = URL.createObjectURL(responseData)
                    $img.attr('src', url)
                    $img.parent().show()
                }
            },
            error: (jqxhr) => {

            }
        })
    

    //DOM트리에서 section객체찾기
    //const sectionObj = document.querySelector('section')
    

    //DOM트리에서 nav>ul>li>a객체들 찾기
    //const menus = document.querySelectorAll('nav>ul>li>a')
    const $menus = $('nav>ul>li>a')

    $menus.each(function() {
        $(this).on('click', function(e) {
            switch (e.target.className) {
                case 'myPage':
                    //location.href = './mypage.html'
                    break;
                case 'myGroupList':
                    location.href = './myGroupList.html';
                    break;
                case 'logout':
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        url: backURL + "/logout",
                        method: "GET",
                        success: () => {
                            console.log("Logout successful");
                            localStorage.removeItem('loginedId');
                            location.href = './Intro.html';
                        }, error: (xhr, status, error) => {
                            console.error("Logout Error:", error);
                        }
                    });
                    break;
            }
            e.preventDefault();
        });
    });
    //----메뉴객체에서 클릭이벤트가 발생했을 때 할 일 END----

    //----로고img객체에서 클릭이벤트가 발생했을 때 할 일 START----
    //main.html URL이동
    $('header>img').click(() => {
        location.href = './main.html'
    })
    //----로고img객체에서 클릭이벤트가 발생했을 때 할 일 END----

    const $teamCreate = $('nav>ul>button.button-hover')
    $teamCreate.click(() => {
        location.href = './teamcreate.html'
    })


    $('form.profile>input[name=f1]').change((e)=>{
        console.log(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        $('form.profile img.profile').attr('src', url)
    })
    
    function onClickUpload() {
        let myInput = document.getElementById("f1");
        myInput.click();

    }

    const $edit = $('div.teamProfile>p.teamProfileEdit')
    $edit.click(() => {
        onClickUpload()
    })

    $teamsearch = $('div.searchBar>img.searchIcon')
    $teamsearch.click(()=>{
        const searchData = $("#mainsearch").val()
        location.href = `./mainsearch.html?data=${searchData}`
  
    })

    $input = $("#mainsearch");
    $input.on('keyup', (e)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            $teamsearch.click()
        }
    })
})

$(document).on("click", 'div.hashtag',function (e) {
    const hashtag = e.target.textContent;
    location.href = "./teamhashtag.html?data=%23"+hashtag
});

$(document).on("click", "#teamName", function(e) {
    
    const teamName = e.target.textContent;
    $.ajax({
      url: backURL+ '/teamnamedupcheck',
      method: 'get',
      data: "teamName="+teamName,
      success: (responseJSONObj) => {
          const teamNo = responseJSONObj.teamNo
          
          location.href = `./teammain.html?teamNo=${teamNo}`
      },
          error: () => {
  
          }
      })
      



  });

  