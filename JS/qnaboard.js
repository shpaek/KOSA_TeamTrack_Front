// const backURL = 'http://localhost:8888/teamtrack'
// const frontURL = 'http://localhost:5500/HTML'

$(() => {

    console.log(teamNo);
    // 함수 정의: 페이지 데이터를 가져와서 화면에 렌더링하는 함수
    console.log();

    const loginedId = sessionStorage.getItem("loginedId")

    function ajaxHandler(cp) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: "http://192.168.1.20:8888/teamtrack/qnaboard",
            method: 'get',
            // data: `currentPage=${cp}&teamNo=64`,  // temaNo 값 가변적이여함
            // data: `currentPage=${cp}&teamNo=${teamNo}`,
            data: {
                currentPage: cp,
                teamNo: teamNo,
                loginedId: loginedId
            },
            success: (responseJSONObj) => {
                const boardList = responseJSONObj.list
                // const memberList = responseJSONObj.memberInfo

                // boardList 데이터 확인
                console.log(boardList);

                // 상태가 0이면 작성 버튼을 숨김
                // if (memberInfo.status === 0) {
                //     // 작성 버튼을 숨김
                //     $('#writeButton').hide();
                // } else {
                //     // 작성 버튼을 표시
                //     $('#writeButton').show();
                // }

                const $originTrObj = $('div.board>div.boardlist>table>thead>tr')
                const $tbodyObj = $('div.board>div.boardlist>table>tbody')

                console.log($originTrObj);
                console.log($tbodyObj);

                $tbodyObj.empty()

                $(boardList).each((index, p) => {
                    const $copyTrObj = $originTrObj.clone()
                    $copyTrObj.empty()

                    // 게시판의 status가 1인상태만 출력
                    if (p.status == 1) {
                        const $boardNoObj = `<td>${p.qnaNo}</td>`
                        $copyTrObj.append($boardNoObj)

                        // boardTitle부분 클릭시 
                        const $boardTitleObj = `<td class="board_title"><a href="http://192.168.1.20:5500/HTML/qnaboarddetail.html?teamNo=${teamNo}&qnaNo=${p.qnaNo}">
                                                ${p.title}</a></td>`
                        $copyTrObj.append($boardTitleObj)

                        const $regDateObj = `<td>${p.regdate}</td>`
                        $copyTrObj.append($regDateObj)

                        $tbodyObj.append($copyTrObj)
                    } else {
                        // 게시판의 status가 0이라면 출력하지 않음(삭제된 게시물)
                        console.log($originTrObj);
                        console.log($tbodyObj);
                    }
                })

                const $divPageGroup = $('div.board>div.pagegroup')
                $divPageGroup.empty()

                const startPage = responseJSONObj.startPage // 시작페이지
                const endPage = responseJSONObj.endPage // 끝페이지

                if (startPage > 1) {
                    let page = `[<span class="pg${startPage - 1}">PREV</span>]&nbsp;&nbsp;&nbsp;`
                    $divPageGroup.html($divPageGroup.html() + page)
                }
                for (let i = startPage; i <= endPage; i++) {
                    let page = `[<span class="pg${i}">${i}</span>]&nbsp;&nbsp;&nbsp;`
                    $divPageGroup.html($divPageGroup.html() + page)
                }
                if (endPage != responseJSONObj.totalPage) {
                    let page = `[<span class="pg${endPage + 1}">NEXT</span>]`
                    $divPageGroup.html($divPageGroup.html() + page)
                }
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    }

    // 페이지 로딩 시 초기 페이지 데이터를 가져옴
    ajaxHandler(1)

    // 이전/다음 페이지 이동 버튼 클릭 시 페이지를 변경하도록 처리
    $('div.board>div.pagegroup').on('click', 'span', (e) => {
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxHandler(currentPage)
    })

    // 글 작성 버튼 클릭 시 새 글 작성 페이지로 이동
    $('div.board>div.write>button').on('click', (e) => {
        $.ajax({
            xhrFields: {
            withCredentials: true
        },
        url: `http://192.168.1.20:8888/teamtrack/qnaboardmemberchk`,
        method: 'get',
        data: `teamNo=${teamNo}`,
        success: (responseJSONObj2) => {
            if(responseJSONObj2.status === 0) {
                Swal.fire({
                    icon: 'question',
                    text: responseJSONObj2.msg
                })
            } else if (responseJSONObj2.status === 1) {
                location.href = `http://192.168.1.20:5500/HTML/qnaboardwrite.html?teamNo=${teamNo}`     // teamNo 값 가변적이여함
            }
        }
    })
    })

    /* 'div.pagegroup' = 현재 돔 트리에 존재하는 객체 */
    /* span 객체가 현재는 존재하지 않지만, 미리 span 객체가 생성되었을 때 할 일을 등록하는 것 */
    $('div.pagegroup').on('click', 'span', (e) => {
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)

        // 페이지 번호 클릭 시 해당 페이지 데이터를 가져옴
        ajaxHandler(currentPage)
    }) // $('div.pagegroup').on()

})
