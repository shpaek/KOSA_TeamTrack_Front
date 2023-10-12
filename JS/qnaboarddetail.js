$(() => {
    const frontURL = 'http://127.0.0.1:5500/HTML'
    const teamNo = new URLSearchParams(window.location.search).get('teamNo');
    const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');

    const url = `http://127.0.0.1:8888/KOSA/qnaboarddetail?teamNo=${teamNo}&qnaNo=${qnaNo}`;

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        success: (responseJSONObj) => {
            const data = responseJSONObj; // 반환된 JSON 데이터

            console.log(data);

            // HTML 테이블의 각 td 엘리먼트에 데이터를 추가
            $('#title').text(data.title);
            $('#regdate').text(data.regdate);
            $('#id').text(data.id);
            $('#content').text(data.content);

        },
        error: (error) => {
            console.error("Error:", error);
        }
    });
 
    // //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('div.detailbuttons>button.edit').on('click',(e)=>{
        $('div.boarddetail').hide()
        $('div.editdetail').show()
        $('div.detailbuttons>button.edit1').show()
        $('div.detailbuttons>button.edit').hide()

        $.ajax({
            url: url,
            method : 'get',
            data : `teamNo=${teamNo}&qnaNo=${qnaNo}`,
            success: (responseJSONObj)=>{            
                const data = responseJSONObj;

                $('div.modifytitleline>input[name=title]').attr('value',data.title);
                $('div.modifycontent>input[name=content]').attr('value',data.content);
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    })

        //---- 수정 완료버튼 클릭 시 발생 이벤트 ----
        $('div.editdetail>form>div.submitbuttons>button[type=submit]').on('click',(e)=>{
            const $formObj = $('form')
    
            $formObj.submit((e) => {
                const fd = new FormData(e.target)
                fd.append("teamNo", teamNo)
                fd.append("qnaNo", qnaNo  )
    
                $.ajax({
                    xhrFields:{
                    withCredentials : true
                    },
                    url: `http://127.0.0.1:8888/KOSA/qnaboardmodify`,
                    method : 'post',
                    contentType: false, //파일첨부용 프로퍼티
                    processData : false, //파일첨부용 프로퍼티
                    data : fd,
                    success : (responseJSONObj)=>{
                        if(responseJSONObj.status==1){
                            alert(responseJSONObj.msg)
                            // history.pushState(teamNo ,null, `${frontURL}/qnaboard.html?teamNo=${teamNo}`)
                            location.href=`${frontURL}/qnaboard.html?teamNo=${teamNo}`
                            // ajaxHandler('GET', `${frontURL}/qnaboard.html?teamNo=${teamNo}`, $sectionObj )
                        }else{
                            alert(responseJSONObj.msg)
                        }
                    },
                    error: (jqxhr)=>{
                        alert(jqxhr.status)
                    }
                })
                return false
            })
        })
    
    //---- 삭제버튼 클릭 시 발생 이벤트 ---- 
    $('div.detailbuttons>button.remove').on('click',(e)=>{
        var result = confirm("삭제하시겠습니까?")

        if(result == true){
            $.ajax({
                xhrFields:{
                    withCredentials : true
                    },
                url: 'http://127.0.0.1:8888/KOSA/qnaboarddelete',
                method : 'get',
                data : `teamNo=${teamNo}&qnaNo=${qnaNo}`,
                success: (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                        location.href = `http://127.0.0.1:5500/HTML/qnaboard.html?teamNo=${teamNo}`
                    }else{
                        alert(responseJSONObj.msg)
                    }
                },
                error:(jqXHR)=>{
                    alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                    console.log(jqXHR)
                }
            })
        }else{
            return false
        }
        return false
    })
  
    // =================== 댓글 작성 버튼 클릭했을 때 할 일 ===================
    const $formObj = $('form.commentwrite')
    const urlParams = new URL(location.href).searchParams

    $formObj.submit((e) => {
        e.preventDefault(); // 기본 제출 동작을 중지합니다.

        alert("in submit")
        const teamNo = urlParams.get("teamNo");
        const qnaNo = urlParams.get("qnaNo");
        // const content = document.getElementById("content");
        const content = $("#comment").val();
        // session 아이디를 줘야함
        // const id = '현재 사용자 정보'
        const id = 'psh2023'

        console.log(teamNo)
        console.log(qnaNo)
        console.log(content)

        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `http://127.0.0.1:8888/KOSA/qnaboardcommentcreate`,
            method : 'post',
            data : {
                teamNo: teamNo,
                qnaNo: qnaNo,
                content: content,
                id: id
            },
            // data : $form.serialize(),
            success : (responseJSONObj)=>{

            },
            error: (jqxhr)=>{
                alert(jqxhr.status)
            }
        })
        return false
    })

  
// -------------------- 댓글 불러오기 ---------------------
$.ajax({
    xhrFields: {
        withCredentials: true
    },
    url: `http://127.0.0.1:8888/KOSA/qnaboardcomment?teamNo=${teamNo}&qnaNo=${qnaNo}`,
    method: 'get',
    success: (responseJSONObj1) => {
        if(responseJSONObj1.status == 0){
            alert(responseJSONObj1.msg)
            return;
        } else {
            const list = responseJSONObj1.list; // 반환된 JSON 데이터 -> responseJsonObj1은 사실 pageGroup타입의 qnaBoardCommentDTO임
    
            console.log(list);
            
                   // HTML 테이블의 tbody를 선택
            const tableBody = $('#commentList table tbody');
    
            // 초기화 - 이전 데이터 삭제
            tableBody.empty();
    
            for (const comments of list) {
    
                if(comments.commentGroup == null ) {
                    //댓글
                    // 코멘트 행(row) 생성
                    const row = $('<tr>').addClass('comment-row');
                
                    // 작성자, 내용, 작성일 셀 생성 및 데이터 할당
                    const commentNoCol =  $('<td>').addClass('comment-No').text(comments.commentNo);
                    commentNoCol.hide();
                    const writerCol = $('<td>').addClass('comment-info').text(comments.teammemberId);
                    const contentCol = $('<td>').addClass('comment-content').text(comments.content);
                    const regdateCol = $('<td>').addClass('comment-date').text(comments.regdate);
                    // const selectButtonCol = $('<td>').addClass('comment-select-button').html('<button>채택</button>');
                    const selectButtonCol = $('<td>').addClass('comment-select-button')
                    const selectReplyButtonCol = $('<td>').addClass('comment-select-replyButton').html('<button>답글</button>');
        
                    // 행에 셀 추가
                    row.append(commentNoCol, writerCol, contentCol, regdateCol, selectButtonCol, selectReplyButtonCol);
        
                    if (comments.pickeddate !== null) {
                        const selectButton = $('<button>').text('채택됨');
                        selectButton.prop('disabled', true); // 채택됨 버튼은 클릭 안되도록
                        selectButtonCol.append(selectButton);
                    } else {
                        const selectButton = $('<button>').text('채택');
                        selectButtonCol.append(selectButton);
                    } // if-else
        
                    // tbody에 행 추가
                    tableBody.append(row);
                }else{
                    //대댓글
                    const replyRow = $('<tr>').addClass('comment-reply-row');
                    const commentNoCol =  $('<td>').addClass('comment-No').text(comments.commentNo);
                    commentNoCol.hide();
                    const writerCol = $('<td>').addClass('comment-info').html( '<span style="color: #3498db;">&#9654;</span> ' + comments.teammemberId);
                    const contentCol = $('<td>').addClass('comment-content').text(comments.content);
                    const regdateCol = $('<td>').addClass('comment-date').text(comments.regdate);
                    const selectButtonCol = $('<td>').addClass('comment-select-button');
            
                    replyRow.append(commentNoCol, writerCol, contentCol, regdateCol, selectButtonCol);
                    tableBody.append(replyRow);
                    // replyRow.css('background-color', 'lightgray'); // 대댓글 배경색
            
                    // 대댓글을 해당 댓글 아래에 추가하려면, commentNoCol를 사용하여 댓글을 찾아야 합니다.
                    const parentCommentNo = comments.commentGroup;
                    const parentCommentRow = tableBody.find('.comment-row .comment-No:contains(' + parentCommentNo + ')').closest('tr');
                    parentCommentRow.after(replyRow);
    
                } // inner if-else
    
            } // for

        } // if-else
    },
    error: (error) => {
        console.error("Error:", error);
    }
});

    // ===================   게시글 작성자가 채택버튼 클릭했을 때 =========================
    // $('td.comment-select-button button').on('click', (e) => {
        // $(document).ready(function () {
        $(document).on('click', 'td.comment-select-button', (e) => {

            const commentButton = $(e.target);
            // 클릭 되어진 버튼의 행을 포함하는 댓글행을 찾아옴
            const commentRow = commentButton.closest('tr.comment-row');

            // 상단에 변수를 초기화하기전에 event핸들러로 button이 먼저 작동하도록 위임해서 안먹은거임
            // 여기 핸들러 내에서 따로 변수를 초기화 해주어야함 ㅠㅠ
            const teamNo = new URLSearchParams(window.location.search).get('teamNo');
            const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');
            const commentNo = commentRow.find('.comment-No').text();

            console.log(teamNo);
            console.log(qnaNo);
            console.log(commentNo);

        // 현재 사용자가 게시글의 작성자인지 확인
            // const boardAuthor = commentRow.find('.comment-info').text();
            // const boardAuthor = data.id;
            // const currentUser = '현재 사용자'; // 현재 사용자정보 가져와서 게시글 사용자와 비교해야함 ******

            // if (author === currentUser) { ******************
            // 현재 사용자가 댓글의 작성자인 경우, '/qnaboardcommentpick'로 POST 요청을 보냅니다.
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: 'http://127.0.0.1:8888/KOSA/qnaboardcommentpick',
                method: 'post',
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentNo: commentNo
                },
                success: (responseJSONObj2) => {
                    console.log(responseJSONObj2)
                    if(responseJSONObj2.status == 1){
                        alert(responseJSONObj2.msg)
                    }else{
                        alert(responseJSONObj2.msg)
                    }
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });

        // } else { //***************** 
 
            // alert("작성자만 채택할 수 있습니다.");
        // }
        return false;
    });

    // =================== 답글버튼 클릭했을 때 =========================
    $(document).on("click", ".comment-select-replyButton", function () {

        const _this = $(this);
        const cid = $(this).siblings('input').val();
        
        _this.siblings('.reCommentDiv').show();
        _this.hide();
        _this.siblings('.reCommentCloseBtn').show();

        
        // 선택한 댓글을 감싸는 상위 <tr> 엘리먼트를 찾습니다.
        const commentRow = _this.closest('tr.comment-row');
        
        // 선택한 댓글에 대한 답글 폼을 동적으로 생성합니다.
        const replyForm = $('<form class="commentwrite reply-form">');
        const replyTable = $('<table class="commentsubmit">');
        const replyRow = $('<tr>');
        const replyTextArea = $('<textarea style="width: 1100px" rows="3" cols="30" name="comment" placeholder="댓글을 입력하세요"></textarea>');
        const replySubmitButton = $('<button type="submit">작성</button>');
    
        replyRow.append($('<td>').append(replyTextArea));
        replyRow.append($('<td>').append(replySubmitButton));
        replyTable.append(replyRow);
        replyForm.append(replyTable);   
        
        const teamNo = new URLSearchParams(window.location.search).get('teamNo');
        const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');
        // const commentNo = commentRow.find('.comment-No').text();
        const commentNo = parseInt(commentRow.find('.comment-No').text());
        const id = 'psh2023'

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);

        // 답글 폼을 댓글 아래에 추가합니다.
        commentRow.after(replyTextArea, replySubmitButton);

        // replyForm.hide(); // 성공적으로 제출한 후 숨기거나 필요에 따라 처리합니다.

    // 이제 replySubmitButton의 클릭 이벤트를 잡습니다.
    replySubmitButton.click(function (e) {

        e.preventDefault(); // 폼의 기본 동작을 중지하고 Ajax를 수행할 수 있도록 합니다.

        const content = replyTextArea.val(); // 사용자가 입력한 내용을 가져오기
        const id = 'psh2023';

        console.log('reply submit teamNo ', teamNo);
        console.log('reply submit qnaNo', qnaNo);
        console.log('reply submit commentNo', commentNo);
        console.log('reply submit content', content);

        // 나머지 Ajax 호출 등 추가 작업
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type: 'post',
            url: "http://127.0.0.1:8888/KOSA/qnaboardcommentreplycreate",
            data: {
                teamNo: teamNo,
                qnaNo: qnaNo,
                commentGroup: commentNo,
                content: content,
                id: id
            },
            success: (responseJSONObj3) => {
                
            },
            error: (error) => {
                console.error("에러:", error);
            }
        });
    });

    // return false;
    }); 

});