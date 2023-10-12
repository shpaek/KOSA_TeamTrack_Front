const backURL = "http://127.0.0.1:8888/KOSA_TeamTrack_Back";
const frontURL = "http://127.0.0.1:5500/HTML";

//const teamNo = location.search.substring(8);
const teamNo = new URL(location.href).searchParams.get("teamNo")

$(() => {
  data = location.search.substr(1);
  $.ajax({
    url: backURL + "/teammanage",
    method: "get",
    data: "gubun=select&" + data,
    success: (responseJSONObj) => {
      const status = responseJSONObj.status;
      const t = responseJSONObj.team;
      const hashlist = responseJSONObj.hashtag;

      const teamName = t.teamName;
      const studyType = t.studyType;
      const onOffLine = t.onOffLine;
      const joinMember = t.joinMember;
      const maxMember = t.maxMember;
      const createDate = t.createDate;
      const startDate = t.startDate;
      const endDate = t.endDate;
      const teamNo = t.teamNo;
      const briefInfo = t.briefInfo;
      const viewCnt = t.viewCnt;
      const hashtags = [];

      $(hashlist).each((index, h) => {
        const hashtag = h.hashtagName;
          hashtags.push(hashtag);
      });
      console.log(hashtags);
      const hashtag1 = hashtags[0];
      const hashtag2 = hashtags[1];
      const hashtag3 = hashtags[2];
      const hashtag4 = hashtags[3];
      const hashtag5 = hashtags[4];

      $("#teamName").val(t.teamName);
      $("#studyType").val(t.studyType);
      if(t.onOffLine == "온라인"){
        $("#onOffLine1").prop("checked", true);
      }else{
        $("#onOffLine2").prop("checked", true);
      }
      $("#maxMember").val(t.maxMember);
      $("#startDate").val(t.startDate);
      $("#endDate").val(t.endDate);
      $("#briefInfo").val(t.briefInfo);
      $("#teamInfo").val(t.teamInfo);
      $("#hashtag1").val(hashtags[0]);
      $("#hashtag2").val(hashtags[1]);
      $("#hashtag3").val(hashtags[2]);
      $("#hashtag4").val(hashtags[3]);
      $("#hashtag5").val(hashtags[4]);
    },
    error: () => {},
  });

  //DOM트리에서 section객체찾기
  //alert("login용 window load eventhandler")
  //const loginedId = localStorage.getItem("loginedId")

  const $btCreate = $("form.form>button.create[type=submit]");
  const $teamName = $(
    "form.form>div.formgroup>input.form__field[name=teamName]"
  );
  const $btDupchk = $("form.form>div.formgroup>button[type=button]");

  const $teamNameObj = $("form.form>div.formgroup>input[name=teamName]");

  $teamNameObj.focus(() => {
    $btCreate.hide();
  });

  // ----- 중복확인 버튼 클릭했을대 할 일 START -----

  $btDupchk.click(() => {
    //e.preventDefault();

    // alert('버튼클릭 확인')

    // 입력 아이디 확인
    const teamNameValue = $("#teamName").val();
    if (!teamNameValue) {
      alert("팀명을 입력하세요.");
      return;
    }

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backURL + "/teamnamedupcheck",
      method: "get",
      //data : "gubun=teamName",
      data: "teamName=" + teamNameValue + "&gubun=teamName",
      success: (responseJSONObj) => {
        if (responseJSONObj.status == 0) {
          alert("이미 사용중인 팀명입니다.");
        } else {
          alert("사용 가능한 팀명입니다.");
          $btCreate.show();
        } // if-else
      },
      error: (jqxhr) => {
        alert(jqxhr.status); // 정상처리가 되지 않으면 status = 0
      },
    });
  }); // $btDupChk.click
  // ----- 중복확인 버튼 클릭했을대 할 일 END -----

  const $form = $("div>form.form");
  //DOM트리에서 form객체찾기
  //----form객체에서 submit이벤트가 발생했을 때 할 일 START----
  $form.submit((e) => {
    const teamNameValue = $("input[name=teamName]").val();
    //alert("ajax-2" + teamNameValue)
    const onOffLineValue = $("input[name=onOffLine]:checked").val();
    //alert("ajax-3" + onOffLineValue)
    const studyTypeValue = $("input[name=studyType]").val();
    //alert("ajax-3" + studyTypeValue)
    const maxMemberValue = $("input[name=maxMember]").val();
    //alert("ajax-3" + studyTypeValue)
    const startDateValue = $("input[name=startDate]").val();
    //alert("ajax-3" + startDateValue)
    const endDateValue = $("input[name=endDate]").val();
    //alert("ajax-3" + endDateValue)
    const hashtag1Value = $("input[name=hashtag1]").val();
    //alert("ajax-3" + hashtag1Value)
    const hashtag2Value = $("input[name=hashtag2]").val();
    //alert("ajax-3" + hashtag2Value)
    const hashtag3Value = $("input[name=hashtag3]").val();
    //alert("ajax-3" + hashtag3Value)
    const hashtag4Value = $("input[name=hashtag4]").val();
    //alert("ajax-3" + hashtag4Value)
    const hashtag5Value = $("input[name=hashtag5]").val();
    //alert("ajax-3" + hashtag5Value)
    const briefInfoValue = $("input[name=briefInfo]").val();
    //alert("ajax-3" + briefInfoValue)
    const teamInfoValue = $("textarea[name=teamInfo]").val();
    //alert("ajax-3" + teamInfoValue)
    alert(teamNo)
    const data = `gubun=update&teamNo=${teamNo}
        &teamName=${teamNameValue}&onOffLine=${onOffLineValue}
        &maxMember=${maxMemberValue}&studyType=${studyTypeValue}&startDate=${startDateValue}
        &endDate=${endDateValue}&hashtag1=${hashtag1Value}
        &hashtag2=${hashtag2Value}&hashtag3=${hashtag3Value}&hashtag4=${hashtag4Value}
        &hashtag5=${hashtag5Value}&briefInfo=${briefInfoValue}
        &teamInfo=${teamInfoValue}`;
    alert("ajax-4" + data)

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backURL + "/teammanage",
      method: "POST",
      data: data,
      // beforeSend: function (xhr) {
      //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      // },
      success: (responseJSONObj) => {
        //요청이 성공하고 성공적으로 응답이 되었을 때 할 일
        //alert(responseText)
        alert(responseJSONObj.msg);
      },
      error: (jqXHR, textStatus) => {
        //응답, 요청에 오류가 있는 경우
        alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
      },
    });
    //alert("ajax-5")
    e.preventDefault();
  });
  //----form객체에서 submit이벤트가 발생했을 때 할 일 END----

  const $close = $("div.popup-form__close");
  const $sectionObj = $("section");

  $close.click((e) => {
    //location.href = './main.html'
    location.href = "./main.html";
  });




  const $deleteButton = $("button.delete");
  $deleteButton.click(() => {
    Swal.fire({
        title: '팀 삭제하기',
        text: "정말로 삭제하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          
    $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: backURL + "/teammanage",
        method: "POST",
        data: "gubun=delete&teamNo="+teamNo,
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        // },
        success: (responseJSONObj) => {
          //요청이 성공하고 성공적으로 응답이 되었을 때 할 일
          //alert(responseText)
          alert(responseJSONObj.msg);
        },
        error: (jqXHR, textStatus) => {
          //응답, 요청에 오류가 있는 경우
          alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
        },
      });

        } else e.preventDefault()
      })
    })


  });

