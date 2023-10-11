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
            const list = responseJSONObj1.list; // 반환된 JSON 데이터 -> responseJsonObj1은 사실 pageGroup타입의 qnaBoardCommentDTO임

            // 전체 값을 뽑으려면
            // list를 하나씩 뽑아서 for문으로 반복문

            console.log(list);

            // // HTML 테이블의 각 td 엘리먼트에 데이터를 추가
            // $('#writer').text(list[0].teammemberId);
            // $('#commentContent').text(list[0].content);
            // $('#commentRegdate').text(list[0].regdate);

                   // HTML 테이블의 tbody를 선택
            const tableBody = $('#commentList table tbody');

            // 초기화 - 이전 데이터 삭제
            tableBody.empty();

            // // 반복문으로 JSON 데이터 처리
            // for (const item of list) {
            //     // 테이블 행(row) 생성
            //     const row = $('<tr>');

            //     // 작성자 열(column) 생성 및 데이터 할당
            //     const writerCol = $('<td>').text(item.teammemberId);
            //     // 내용 열(column) 생성 및 데이터 할당
            //     const contentCol = $('<td>').text(item.content);
            //     // 작성일 열(column) 생성 및 데이터 할당
            //     const regdateCol = $('<td>').text(item.regdate);

            //     // 행에 열 추가
            //     row.append(writerCol, contentCol, regdateCol);

            //     // tbody에 행 추가
            //     tableBody.append(row);
            // }
            for (const item of list) {
                // 코멘트 행(row) 생성
                const row = $('<tr>').addClass('comment-row');
            
                // 작성자, 내용, 작성일 셀 생성 및 데이터 할당
                const commentNoCol =  $('<td>').addClass('comment-No').text(item.commentNo);
                commentNoCol.hide();
                const writerCol = $('<td>').addClass('comment-info').text(item.teammemberId);
                const contentCol = $('<td>').addClass('comment-content').text(item.content);
                const regdateCol = $('<td>').addClass('comment-date').text(item.regdate);
                // const selectButtonCol = $('<td>').addClass('comment-select-button').html('<button>채택</button>');
                const selectButtonCol = $('<td>').addClass('comment-select-button')
            
                // commentNo를 data-commentNo 속성으로 저장
                // row.attr('data-commentNo', item.commentNo);

                // 행에 셀 추가
                row.append(commentNoCol, writerCol, contentCol, regdateCol, selectButtonCol);

                if (item.pickeddate !== null) {
                    const selectButton = $('<button>').text('채택됨');
                    selectButton.prop('disabled', true); // 채택됨 버튼은 클릭 안되도록
                    selectButtonCol.append(selectButton);
                } else {
                    const selectButton = $('<button>').text('채택');
                    selectButtonCol.append(selectButton);
                } // if-else
            
                // tbody에 행 추가
                tableBody.append(row);
            }
        },
        error: (error) => {
            console.error("Error:", error);
        }
    });

    // ===================   게시글 작성자가 채택버튼 클릭했을 때 =========================
    // $('td.comment-select-button button').on('click', (e) => {
        $('#commentList').on('click', 'button', (e) => {

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



    //============================== 대댓글 ================================
    // $.ajax({
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     url: `http://127.0.0.1:8888/KOSA/qnaboardcomment?teamNo=${teamNo}&qnaNo=${qnaNo}`,
    //     method: 'get',
    //     success: (responseJSONObj1) => {
    //         const list = responseJSONObj1.list;
    
    //         const tableBody = $('#commentList table tbody');
    //         tableBody.empty();
    
    //         const commentsMap = new Map(); // 댓글을 그룹화하기 위한 맵
    
    //         for (const item of list) {
    //             if (item.commentGroup === null) {
    //                 // 대댓글이 아닌 댓글
    //                 const row = $('<tr>').addClass('comment-row');
    //                 const writerCol = $('<td>').addClass('comment-info').text(item.teammemberId);
    //                 const contentCol = $('<td>').addClass('comment-content').text(item.content);
    //                 const regdateCol = $('<td>').addClass('comment-date').text(item.regdate);
    
    //                 row.append(writerCol, contentCol, regdateCol);
    //                 tableBody.append(row);
    
    //                 // 대댓글을 위한 댓글 그룹 생성
    //                 commentsMap.set(item.comment_no, $('<div>'));
    
    //             } else {
    //                 // 대댓글
    //                 const replyRow = $('<tr>').addClass('comment-reply-row');
    //                 const replyContentCol = $('<td>').attr('colspan', 3).addClass('comment-reply-content').text(item.content);
    //                 replyRow.append(replyContentCol);
    
    //                 // 대댓글을 해당 댓글 아래에 추가
    //                 commentsMap.get(item.commentGroup).append(replyRow);
    //             }
    //         }
    
    //         // 댓글과 대댓글을 화면에 표시
    //         commentsMap.forEach(comment => {
    //             tableBody.append(comment);
    //         });
    //     },
    //     error: (error) => {
    //         console.error("Error:", error);
    //     }
    // });

});