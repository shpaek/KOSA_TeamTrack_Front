$(() => {
    const teamNo = localStorage.getItem("taskteamno")
    const taskNo = localStorage.getItem("taskNo")

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/viewtask`,
        method: 'get',
        data: `teamNo=${teamNo}&taskNo=${taskNo}`,
        success: (responseJSONObj) => {
            if (responseJSONObj.status == 0) {
                alert(responseJSONObj.msg)
                return
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
                const title = responseJSONObj.title
                const nickname = responseJSONObj.nickname
                //const regdate = responseJSONObj.regdate

                const $origintitleObj = $('div.taskviewbox>div.tasktitle')
                const $titleObj = $('<h1>')
                $titleObj.append(title)
                $origintitleObj.append($titleObj)

                const $originnicknameObj = $('div.tasknickname')
                const $nicknameObj = $('<span>')
                $nicknameObj.append(nickname)
                $originnicknameObj.append($nicknameObj)
            }

        }, error: (() => {
            alert('error')
        })
    })

    $('div.taskanswer>button').click((e) => {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `${backURL}/viewquizanswer`,
            method: 'get',
            data: `teamNo=${teamNo}&taskNo=${taskNo}`,
            success: (responseJSONObj) => {
                if (responseJSONObj.status == 0) {
                    Swal.fire({
                        icon: 'question',
                        text: responseJSONObj.msg
                    })
                    return
                } else if (responseJSONObj.status == 1) {
                    const $divobj = $('<div>')
                    $divobj.addClass('taskanswercontent')

                    var cnt = 0
                    const list = responseJSONObj.list

                    list.forEach(element => {
                        console.log(element)

                        const $divquizobj = $('<div>')
                        const answer = element
                        $divquizobj.addClass('quizanswer' + cnt)
                        cnt = cnt + 1
                        $divquizobj.append("Q" + cnt + " : " + answer)
                        $divobj.append($divquizobj)
                    })

                    $('div.content1').append($divobj)
                    $('div.taskanswer>button').hide()
                }
            }
        })

    })

    $('div.myanswer>button').click((e) => {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `${backURL}/viewmemberanswer`,
            method: 'get',
            data: `teamNo=${teamNo}&taskNo=${taskNo}`,
            success: (responseJSONObj) => {
                if (responseJSONObj.status == 0) {
                    Swal.fire({
                        icon: 'question',
                        text: responseJSONObj.msg
                    })
                    return
                } else if (responseJSONObj.status == 1) {
                    const $divobj = $('<div>')
                    $divobj.addClass('myanswercontent')

                    var cnt = 0
                    const list = responseJSONObj.list

                    list.forEach(element => {
                        console.log(element)

                        const $divquizobj = $('<div>')
                        const answer = element
                        $divquizobj.addClass('myanswer' + cnt)
                        cnt = cnt + 1
                        $divquizobj.append("Q" + cnt + " : " + answer)
                        $divobj.append($divquizobj)
                    })

                    $('div.content2').append($divobj)
                    $('div.myanswer>button').hide() 
                }
            }
        })
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

})