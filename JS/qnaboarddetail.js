$(() => {
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const teamNo = new URLSearchParams(window.location.search).get('teamNo');
    const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');
    const loginedId = sessionStorage.getItem("loginedId")

    const url = `http://192.168.1.20:8888/teamtrack/qnaboarddetail?teamNo=${teamNo}&qnaNo=${qnaNo}`;

    // ======================== 상세 페이지 로드시 할 일 ==============================

    // data를 전역변수로 사용해서 게시글 작성자 정보를 다른 ajax에서 사용하기 위함
    let data;


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        success: (responseJSONObj) => {
            data = responseJSONObj; // 반환된 JSON 데이터

            // session아이디와 게시글 작성자의 아이디가 같지 않다면 수정, 삭제 버튼 안보이게
            if (loginedId !== data.id) {
                $('div.detailbuttons>button.edit').hide();
                $('div.detailbuttons>button.remove').hide();
            }

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

    // ========================= 수정버튼 클릭 시 발생 이벤트 ===============================
    $('div.detailbuttons>button.edit').on('click', (e) => {
        $('div.boarddetail').hide()
        $('div.editdetail').show()
        $('div.detailbuttons>button.edit1').show()
        $('div.detailbuttons>button.edit').hide()
        $('.commentwrite').hide(); // 댓글 작성부분 숨기기
        $('#commentList').hide(); // 댓글 목록 숨기기
        $('div.container>div>div>span').hide(); // 'Comments' 부분 숨기기

        $.ajax({
            url: url,
            method: 'get',
            data: `teamNo=${teamNo}&qnaNo=${qnaNo}`,
            success: (responseJSONObj) => {
                const data = responseJSONObj;

                $('div.modifytitleline>input[name=title]').attr('value', data.title);
                // $('div.modifycontent>input[name=content]').attr('value', data.content);
                $('div.modifycontent>textarea[name=content]').text(data.content);
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    })

    
    // ========================= 수정완료 버튼 클릭 시 발생 이벤트 ===============================
    $('div.editdetail>form>div.submitbuttons>button[type=submit]').on('click', (e) => {
        const $formObj = $('form')

        $formObj.submit((e) => {
            const fd = new FormData(e.target)
            fd.append("teamNo", teamNo)
            fd.append("qnaNo", qnaNo)

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: `http://192.168.1.20:8888/teamtrack/qnaboardmodify`,
                method: 'post',
                contentType: false, //파일첨부용 프로퍼티
                processData: false, //파일첨부용 프로퍼티
                data: fd,
                success: (responseJSONObj) => {
                    if (responseJSONObj.status == 1) {
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        }).then((result) => {
                            location.href = `${frontURL}/qnaboard.html?teamNo=${teamNo}`
                        });

                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj.msg
                        })
                    }
                },
                error: (jqxhr) => {
                    alert(jqxhr.status)
                }
            })
            return false
        })
    })

    
    // ========================= 삭제버튼 클릭 시 발생 이벤트 ===============================
    $('div.detailbuttons>button.remove').on('click', (e) => {
        Swal.fire({
            icon: 'success',
            title: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: 'http://192.168.1.20:8888/teamtrack/qnaboarddelete',
                method: 'get',
                data: `teamNo=${teamNo}&qnaNo=${qnaNo}`,
                success: (responseJSONObj) => {
                    if (responseJSONObj.status == 1) {
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        }).then((result) => {
                            location.href = `http://192.168.1.20:5500/HTML/qnaboard.html?teamNo=${teamNo}`
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj.msg
                        })
                    }
                },
                error: (jqXHR) => {
                    alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
                    console.log(jqXHR)
                }
            })
        } else {
            return false
        }
    });
        return false
    })

    
    // ========================= 댓글 작성버튼 클릭 시 발생 이벤트 ===============================
    const $formObj = $('form.commentwrite')
    const urlParams = new URL(location.href).searchParams

    $formObj.submit((e) => {
        e.preventDefault(); // 기본 제출 동작을 중지합니다.

        const teamNo = urlParams.get("teamNo");
        const qnaNo = urlParams.get("qnaNo");
        // const content = document.getElementById("content");
        const content = $("#comment").val();
        // 세션에 저장된 아이디값이 회원의 아이디
        const teammemberId = sessionStorage.getItem("loginedId")

        console.log(teamNo)
        console.log(qnaNo)
        console.log(content)

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `http://192.168.1.20:8888/teamtrack/qnaboardcommentcreate`,
            method: 'post',
            data: {
                teamNo: teamNo,
                qnaNo: qnaNo,
                content: content,
                teammemberId: teammemberId
            },
            // data : $form.serialize(),
            success: (responseJSONObj) => {
                if (responseJSONObj.status == 1) {
                    Swal.fire({
						icon: 'success',
						text: responseJSONObj.msg
					}).then((result) => {
                        location.reload();
					});
                } else {
                    Swal.fire({
						icon: 'warning',
						text: responseJSONObj.msg
					}).then((result) => {
                        location.reload();
					});
                }
            },
            error: (jqxhr) => {
                alert(jqxhr.status)
            }
        })
        return false
    })


    
    // ========================= 페이지 로드시 댓글 불러오기 ===============================
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `http://192.168.1.20:8888/teamtrack/qnaboardcomment?teamNo=${teamNo}&qnaNo=${qnaNo}`,
        method: 'get',
        success: (responseJSONObj1) => {
            if (responseJSONObj1.status == 0) {
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

                    if (comments.commentGroup == null) {
                        //댓글
                        // 코멘트 행(row) 생성
                        const row = $('<tr>').addClass('comment-row');

                        // 작성자, 내용, 작성일 셀 생성 및 데이터 할당
                        const commentNoCol = $('<td>').addClass('comment-No').text(comments.commentNo);
                        commentNoCol.hide();
                        const writerCol = $('<td>').addClass('comment-info').text(comments.teammemberId);
                        const contentCol = $('<td>').addClass('comment-content').text(comments.content);
                        const regdateCol = $('<td>').addClass('comment-date').text(comments.regdate);
                        // const selectButtonCol = $('<td>').addClass('comment-select-button').html('<button>채택</button>');
                        const selectButtonCol = $('<td>').addClass('comment-select-button')
                        const selectReplyButtonCol = $('<td>').addClass('comment-select-replyButton').html('<button>답글</button>');
                        const selectModifyButtonCol = $('<td>').addClass('comment-select-modifyButton').html('<button>수정</button>');
                        const selectDeleteButtonCol = $('<td>').addClass('comment-select-deleteButton').html('<button>삭제</button>');

                        // session아이디와 작성자 아아디를 비교해서 같지 않다면 수정과 삭제버튼 가리기
                        if (loginedId !== comments.teammemberId) {
                            selectModifyButtonCol.hide();
                            selectDeleteButtonCol.hide();
                        }

                        // 행에 셀 추가
                        row.append(commentNoCol, writerCol, contentCol, regdateCol, selectButtonCol, selectReplyButtonCol, selectModifyButtonCol, selectDeleteButtonCol);

                        if (comments.pickeddate !== null) {
                            const selectButton = $('<button>').text('채택됨');
                            selectButton.prop('disabled', true); // 채택됨 버튼은 클릭 안되도록
                            selectButtonCol.append(selectButton);
                        } else {
                            const selectButton = $('<button>').text('채택');
                            selectButtonCol.append(selectButton);
                        } // if-else

                        // 댓글 삭제시 가리기
                        if (comments.commentStatus === 0) {
                            row.addClass('grey-background');
                            contentCol.text('이 댓글은 삭제되었습니다.');
                            regdateCol.hide();
                            selectButtonCol.hide();
                            selectReplyButtonCol.hide();
                            selectModifyButtonCol.hide();
                            selectDeleteButtonCol.hide();
                        }

                        // tbody에 행 추가
                        tableBody.append(row);
                    } else {
                        // const row = $('<tr>').addClass('reply-comment-row');

                        //대댓글
                        const replyRow = $('<tr>').addClass('comment-reply-row');
                        const commentNoCol = $('<td>').addClass('comment-No').text(comments.commentNo);
                        commentNoCol.hide();
                        const writerCol = $('<td>').addClass('comment-info').html('<span style="color: #3498db;">&#9654;</span> ' + comments.teammemberId);
                        const contentCol_reply = $('<td>').addClass('comment-content').text(comments.content);
                        const regdateCol_reply = $('<td>').addClass('comment-date').text(comments.regdate);
                        const selectButtonCol_reply = $('<td>').addClass('comment-select-button');
                        const selectModifyButtonCol_reply = $('<td>').addClass('comment-select-modifyButton-reply').html('<button>수정</button>');
                        const selectDeleteButtonCol_reply = $('<td>').addClass('comment-select-deleteButton-reply').html('<button>삭제</button>');

                        replyRow.append(commentNoCol, writerCol, contentCol_reply, regdateCol_reply, selectModifyButtonCol_reply, selectDeleteButtonCol_reply);
                        tableBody.append(replyRow);
                        // replyRow.css('background-color', 'lightgray'); // 대댓글 배경색

                        // 대댓글을 해당 댓글 아래에 추가하려면, commentNoCol를 사용하여 댓글을 찾아야 함
                        const parentCommentNo = comments.commentGroup;
                        const parentCommentRow = tableBody.find('.comment-row .comment-No:contains(' + parentCommentNo + ')').closest('tr');
                        parentCommentRow.after(replyRow);

                        // session아이디와 작성자 아아디를 비교해서 같지 않다면 수정과 삭제버튼 가리기
                        if (loginedId !== comments.teammemberId) {
                            selectModifyButtonCol_reply.hide();
                            selectDeleteButtonCol_reply.hide();
                        }

                        // 댓글 삭제시 가리기
                        if (comments.commentStatus === 0) {
                            replyRow.addClass('grey-background');
                            contentCol_reply.text('이 댓글은 삭제되었습니다.');
                            // contentCol_reply.hide();
                            // selectButtonCol_reply.hide();
                            // selectReplyButtonCol_reply.hide();
                            regdateCol_reply.hide();
                            selectModifyButtonCol_reply.hide();
                            selectDeleteButtonCol_reply.hide();
                        }

                    } // inner if-else

                } // for

            } // if-else
        },
        error: (error) => {
            console.error("Error:", error);
        }
    });

    // ===================   게시글 작성자가 채택버튼 클릭했을 때 =========================
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

        // 전역변수로 선언한 data를 가져와서 비교 ***
        if (loginedId === data.id) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: 'http://192.168.1.20:8888/teamtrack/qnaboardcommentpick',
                method: 'post',
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentNo: commentNo
                },
                success: (responseJSONObj2) => {
                    console.log(responseJSONObj2)
                    if (responseJSONObj2.status == 1) {
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj2.msg
                        })
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text:  '작성자만 채택할 수 있습니다.'
                        })
                    }
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });
        } else {
            alert(data.id)
            Swal.fire({
                icon: 'warning',
                text: "작성자만 채택할 수 있습니다."
            });
            return false;
        }

        return false;
    });

    
    // ========================= 답글 버튼 클릭 시 발생 이벤트 ===============================
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
        const id = sessionStorage.getItem("loginedId")

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);
        console.log('id', id)

        // 답글 폼을 댓글 아래에 추가합니다.
        commentRow.after(replyTextArea, replySubmitButton);

        // replyForm.hide(); // 성공적으로 제출한 후 숨기거나 필요에 따라 처리합니다.

        // 이제 replySubmitButton의 클릭 이벤트를 잡습니다.
        replySubmitButton.click(function (e) {

            e.preventDefault(); // 폼의 기본 동작을 중지하고 Ajax를 수행할 수 있도록 합니다.

            const content = replyTextArea.val(); // 사용자가 입력한 내용을 가져오기
            const teammemberId = sessionStorage.getItem("loginedId")

            console.log('reply submit teamNo ', teamNo);
            console.log('reply submit qnaNo', qnaNo);
            console.log('reply submit commentNo', commentNo);
            console.log('reply submit content', content);
            console.log('reply submit teammemberId', teammemberId);

            // 나머지 Ajax 호출 등 추가 작업
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                type: 'post',
                url: "http://192.168.1.20:8888/teamtrack/qnaboardcommentreplycreate",
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentGroup: commentNo,
                    content: content,
                    teammemberId: teammemberId
                },
                success: (responseJSONObj3) => {
                    location.reload();
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });
        });

        // return false;
    });

    // ========================== 댓글삭제 버튼 클릭시 ================================
    $(document).on('click', 'td.comment-select-deleteButton', (e) => {

        const commentButton = $(e.target);
        // 클릭 되어진 버튼의 행을 포함하는 댓글행을 찾아옴
        const commentRow = commentButton.closest('tr.comment-row');

        const teamNo = new URLSearchParams(window.location.search).get('teamNo');
        const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');
        const commentNo = parseInt(commentRow.find('.comment-No').text());

        // seesion아이디 사용해야 함
        // const id = 'psh2023'
        const loginedId = sessionStorage.getItem("loginedId")

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);

         // 나머지 Ajax 호출 등 추가 작업
         $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type: 'post',
            url: "http://192.168.1.20:8888/teamtrack/qnaboardcommentdelete",
            data: {
                teamNo: teamNo,
                qnaNo: qnaNo,
                commentNo: commentNo,
                id: id
            },
            success: (responseJSONObj3) => {
                if(responseJSONObj3 === 1) {
                    Swal.fire({
						icon: 'success',
						text: responseJSONObj3.msg
					}).then((result) => {
                        location.reload();
					});
                } else {
                    Swal.fire({
						icon: 'warning',
						text: responseJSONObj3.msg
					})
                }
            },
            error: (error) => {
                console.error("에러:", error);
            }
        });

    });

    // ============================ 댓글 수정버튼 클릭시 ====================================
    $(document).on("click", "td.comment-select-modifyButton", function () {

        const _this = $(this);
        const cid = $(this).siblings('input').val();

        _this.siblings('.reCommentDiv').show();
        _this.hide();
        _this.siblings('.reCommentCloseBtn').show();

        // 선택한 댓글을 감싸는 상위 <tr> 엘리먼트를 찾습니다.
        const commentRow = _this.closest('tr.comment-row');

        // 선택한 댓글에 대한 수정 폼을 동적으로 생성합니다.
        const modifyForm = $('<form class="commentwrite modify-form">');
        const modifyTable = $('<table class="commentsubmit">');
        const modifyRow = $('<tr>');
        const modifyTextArea = $('<textarea style="width: 1100px" rows="3" cols="30" name="comment" placeholder="댓글을 입력하세요"></textarea>');
        const modifySubmitButton = $('<button type="submit">수정</button>');

        modifyRow.append($('<td>').append(modifyTextArea));
        modifyRow.append($('<td>').append(modifySubmitButton));
        modifyTable.append(modifyRow);
        modifyForm.append(modifyTable);

        const teamNo = new URLSearchParams(window.location.search).get('teamNo');
        const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');

        const commentNo = parseInt(commentRow.find('.comment-No').text());
        const id = sessionStorage.getItem("loginedId")

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);

        // 답글 폼을 댓글 아래에 추가합니다.
        commentRow.after(modifyTextArea, modifySubmitButton);

        // replyForm.hide(); // 성공적으로 제출한 후 숨기거나 필요에 따라 처리합니다.

        // 이제 replySubmitButton의 클릭 이벤트를 잡습니다.
        modifySubmitButton.click(function (e) {

            e.preventDefault(); // 폼의 기본 동작을 중지하고 Ajax를 수행할 수 있도록

            const content = modifyTextArea.val(); // 사용자가 입력한 내용을 가져오기
            const id = sessionStorage.getItem("loginedId")

            console.log('mdofiy submit teamNo ', teamNo);
            console.log('mdofiy submit qnaNo', qnaNo);
            console.log('mdofiy submit commentNo', commentNo);
            console.log('mdofiy submit content', content);

            // 나머지 Ajax 호출 등 추가 작업
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                type: 'post',
                url: "http://192.168.1.20:8888/teamtrack/qnaboardcommentmodify",
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentNo: commentNo,
                    content: content,
                    id: id
                },
                success: (responseJSONObj4) => {
                    if(responseJSONObj4 == 1) {
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj4.msg
                        }).then((result) => {
                            location.reload();
                        });
                    } {
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj4.msg
                        })
                    }
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });
        });

        return false;
    });


    // ======================= 대댓글 수정 ==================================

    $(document).on("click", "td.comment-select-modifyButton-reply", function () {

        const _this = $(this);
        const cid = $(this).siblings('input').val();

        _this.siblings('.reCommentDiv').show();
        _this.hide();
        _this.siblings('.reCommentCloseBtn').show();


        // 선택한 댓글을 감싸는 상위 <tr> 엘리먼트를 찾습니다.
        const commentRow_reply = _this.closest('tr.comment-reply-row');

        // 선택한 댓글에 대한 답글 폼을 동적으로 생성합니다.
        const modifyForm_reply = $('<form class="commentwrite modify-form">');
        const modifyTable_reply = $('<table class="commentsubmit">');
        const modifyRow_reply = $('<tr>');
        const modifyTextArea_reply = $('<textarea style="width: 1100px" rows="3" cols="30" name="comment" placeholder="댓글을 입력하세요"></textarea>');
        const modifySubmitButton_reply = $('<button type="submit">수정</button>');
    
        modifyRow_reply.append($('<td>').append(modifyTextArea_reply));
        modifyRow_reply.append($('<td>').append(modifySubmitButton_reply));
        modifyTable_reply.append(modifyRow_reply);
        modifyForm_reply.append(modifyTable_reply);

        const teamNo = new URLSearchParams(window.location.search).get('teamNo');
        const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');

        const commentNo = parseInt(commentRow_reply.find('.comment-No').text());
        const loginedId = sessionStorage.getItem("loginedId")

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);

        // 답글 폼을 댓글 아래에 추가합니다.
        commentRow_reply.after(modifyTextArea_reply, modifySubmitButton_reply);

        // replyForm.hide(); // 성공적으로 제출한 후 숨기거나 필요에 따라 처리합니다.

        // 이제 replySubmitButton의 클릭 이벤트를 잡습니다.
        modifySubmitButton_reply.click(function (e) {

            e.preventDefault(); // 폼의 기본 동작을 중지하고 Ajax를 수행할 수 있도록 합니다.

            const content = modifyTextArea_reply.val(); // 사용자가 입력한 내용을 가져오기
            const loginedId = sessionStorage.getItem("loginedId")

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
                url: "http://192.168.1.20:8888/teamtrack/qnaboardcommentmodify",
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentNo: commentNo,
                    content: content,
                    id: loginedId
                },
                success: (responseJSONObj5) => {
                    if(responseJSONObj5.status === 1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj5.msg
                        }).then((result) => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj5.msg
                        })
                    }
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });
        });

        return false;
    });

    // ====================== 대댓글 삭제 =====================================

    $(document).on('click', 'td.comment-select-deleteButton-reply', (e) => {

        const commentButton = $(e.target);

        // 선택한 댓글을 감싸는 상위 <tr> 엘리먼트를 찾습니다.
        const commentRow_reply = commentButton.closest('tr.comment-reply-row');

        const teamNo = new URLSearchParams(window.location.search).get('teamNo');
        const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');

        const commentNo = parseInt(commentRow_reply.find('.comment-No').text());
        const loginedId = sessionStorage.getItem("loginedId")

        console.log('teamNo ', teamNo);
        console.log('qnaNo', qnaNo);
        console.log('commentNo', commentNo);

            // 나머지 Ajax 호출 등 추가 작업
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                type: 'post',
                url: "http://192.168.1.20:8888/teamtrack/qnaboardcommentdelete",
                data: {
                    teamNo: teamNo,
                    qnaNo: qnaNo,
                    commentNo: commentNo,
                    id: loginedId
                },
                success: (responseJSONObj5) => {
                    if(responseJSONObj5.status === 1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj5.msg
                        }).then((result) => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj5.msg
                        })
                    }
                },
                error: (error) => {
                    console.error("에러:", error);
                }
            });

        return false;
    });

});