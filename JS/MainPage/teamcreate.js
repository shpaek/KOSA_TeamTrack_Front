const backURL = 'http://127.0.0.1:8888/teamtrack'
const frontURL = 'http://127.0.0.1:5500/HTML'


$(() => {
    //DOM트리에서 section객체찾기
    //alert("login용 window load eventhandler")
    //const loginedId = localStorage.getItem("loginedId")

    const $btCreate = $('form.form>button.create[type=submit]')
    const $teamName = $('form.form>div.formgroup>input.form__field[name=teamName]')
    const $btDupchk = $('form.form>div.formgroup>button[type=button]')

    const $teamNameObj = $('form.form>div.formgroup>input[name=teamName]')

    $teamNameObj.focus(() => {
        $btCreate.hide()
    })

    // ----- 중복확인 버튼 클릭했을대 할 일 START -----

    $btDupchk.click(() => {

        //e.preventDefault();

        // alert('버튼클릭 확인')

        // 입력 아이디 확인
        const teamNameValue = $("#teamName").val();
        if (!teamNameValue) {
            alert('팀명을 입력하세요.');
            return;
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url : backURL + '/teamnamedupcheck',
            method : 'get',
            //data : "gubun=teamName",
            data: 'teamName='+teamNameValue+"&gubun=teamName",
            success : (responseJSONObj) => {
                if(responseJSONObj.status == 0) {
                    alert('이미 사용중인 팀명입니다.')
                } else {
                    alert('사용 가능한 팀명입니다.')
                    $btCreate.show()
                } // if-else
            },
            error: (jqxhr) => {
                alert(jqxhr.status) // 정상처리가 되지 않으면 status = 0
            }
        })
    }) // $btDupChk.click
    // ----- 중복확인 버튼 클릭했을대 할 일 END -----


    const $form = $('div>form.form')
    //DOM트리에서 form객체찾기
    //----form객체에서 submit이벤트가 발생했을 때 할 일 START----
    $form.submit((e) => {


        const teamNameValue = $('input[name=teamName]').val()
        const onOffLineValue = $('input[name=onOffLine]:checked').val()
        const studyTypeValue = $('input[name=studyType]').val()
        const maxMemberValue = $('input[name=maxMember]').val()
        const startDateValue = $('input[name=startDate]').val()
        const endDateValue = $('input[name=endDate]').val()
        const hashtag1Value = $('input[name=hashtag1]').val()
        const hashtag2Value = $('input[name=hashtag2]').val()
        const hashtag3Value = $('input[name=hashtag3]').val()
        const hashtag4Value = $('input[name=hashtag4]').val()
        const hashtag5Value = $('input[name=hashtag5]').val()
        const briefInfoValue = $('input[name=briefInfo]').val()
        const teamInfoValue = $('textarea[name=teamInfo]').val()
        
        //const loginedId = localStorage.getItem('loginedId');
        const loginedId = 'psh2023';
        const fd = new FormData();
        const files = $('input[type="file"]');
        for (let i = 0; i < files.length; i++) {
            fd.append('f1', files[i].files[0]);  // 각 파일 필드의 첫 번째 파일을 추가
        }
        
        fd.append("gubun", "create")
        fd.append('leaderId', loginedId)
        fd.append('teamName', teamNameValue)
        fd.append('onOffLine', onOffLineValue)
        fd.append('maxMember', maxMemberValue)
        fd.append('studyType', studyTypeValue)
        fd.append('startDate', startDateValue)
        fd.append('endDate', endDateValue)
        fd.append('hashtag1', hashtag1Value)
        fd.append('hashtag2', hashtag2Value)
        fd.append('hashtag3', hashtag3Value)
        fd.append('hashtag4', hashtag4Value)
        fd.append('hashtag5', hashtag5Value)
        fd.append('briefInfo', briefInfoValue)
        fd.append('teamInfo', teamInfoValue)
        fd.append('briefInfo', briefInfoValue)

        fd.forEach((value, key)=>{
            console.log(key)
            console.log(value)
            console.log("-----------")
        })
        $.ajax({
            xhrFields:{
                withCredentials: true
            },
            url: backURL+ "/teammanage",
            method: "POST",
            contentType: false, //파일첨부
            processData: false, //파일첨부용 프로퍼티
            data: fd, //"t=tValue&"
            success: (responseJSONObj) => {
                //요청이 성공하고 성공적으로 응답이 되었을 때 할 일
                //alert(responseText)
                    alert(responseJSONObj.msg)
                    location.href = './main.html'
            },
            error: (jqXHR, textStatus) => {
                //응답, 요청에 오류가 있는 경우
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            }
        })
        
        return false
    })
    //----form객체에서 submit이벤트가 발생했을 때 할 일 END----

    const $close = $('div.popup-form__close')
    const $sectionObj = $('section')

    $close.click((e) => {
       //location.href = './main.html'
       location.href = "./main.html"
    })




    $('form.form>input[name=f1]').change((e)=>{
        console.log(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        $('form.form img.teamProfileImg2').attr('src', url)
    })


})
