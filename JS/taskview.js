function ajaxHandler(method, u, target) {
    console.log(u)

    if (method == 'GET') {
        target.load(u, function (response, status, xhr) {
            if (status == "error") {
                alert(xhr.status + xhr.statusText)
            }
        })
    }
}

$(() => {
    const teamNo=localStorage.getItem("taskteamno")
    const taskNo = localStorage.getItem("taskNo")
    console.log(teamNo)

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${taskbackURL}/viewtask`,
        method: 'get',
        data: `teamNo=${teamNo}&taskNo=${taskNo}`,
        success: (responseJSONObj) => {
            if (responseJSONObj.status == 0) {
                alert(responseJSONObj.msg)
                return
            } else if (responseJSONObj.status == 1) {
                const title = responseJSONObj.title
                const nickname = responseJSONObj.nickname
                const regdate = responseJSONObj.regdate

                const $origintitleObj = $('div.taskviewbox>div.tasktitle')
                const $titleObj = $('<h1>')
                $titleObj.append(title)
                $origintitleObj.append($titleObj)

                const $originnicknameObj = $('div.tasknickname')
                const $nicknameObj = $('<span>')
                $nicknameObj.append(nickname)
                $originnicknameObj.append($nicknameObj)
                console.log(taskNo)
            }

        }, error: (() => {
            alert('error')
        })
    })

    var open1 = 0;
    var open2 = 0;

    $('div.taskanswer>button').click((e) => {
        if (open1 == 1) {
            e.preventDefault()
        } else {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: `${taskbackURL}/viewquizanswer`,
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
                        open1 = 1;
                    }
                }
            })
        }

    })

    $('div.myanswer>button').click((e) => {
        if (open2 == 1) {
            e.preventDefault()
        } else {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: `${taskbackURL}/viewmemberanswer`,
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
                        open2 = 1;
                    }
                }
            })
        }
    })

    $('button.taskfiledown').click(() => {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `${taskbackURL}/taskdownload`,
            method: 'get',
            data: `teamNo=${teamNo}&taskNo=${taskNo}`,
            success: () => {
                alert(teamNo+", "+taskNo)
                location.href = taskbackURL+ '/taskdownload?teamNo='+teamNo+'&taskNo=' + taskNo
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