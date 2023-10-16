const backURL = 'http://192.168.1.20:8888/teamtrack'
$(() => {

    var score = 0
    const teamNo=localStorage.getItem('taskteamno')
    const taskNo = localStorage.getItem('taskNo')

    $('span.s1').click(() => {
        Swal.fire({
            title: "1점을 선택하시겠습니까?",
            text: "이후 수정이 불가능합니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 1

                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: `${backURL}/reviewtask`,
                    method: 'get',
                    data: `teamNo=${teamNo}&taskNo=${taskNo}&reviewScore=${score}`,
                    success: (responseJSONObj) => {
                        if (responseJSONObj.status == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) history(-1)
                            })
                        } else if (responseJSONObj.status == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) location.href = './taskboard.html?teamNo='+teamNo
                            })
                        }
                    }, error: ()=>{alert('?')}
                })

                return false

            }
        })
    })

    $('span.s2').click(() => {
        Swal.fire({
            title: "2점을 선택하시겠습니까?",
            text: "이후 수정이 불가능합니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 2
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: `${backURL}/reviewtask`,
                    method: 'get',
                    data: `teamNo=${teamNo}&taskNo=${taskNo}&reviewScore=${score}`,
                    success: (responseJSONObj) => {
                        if (responseJSONObj.status == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) history(-1)
                            })
                        } else if (responseJSONObj.status == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) location.href = './taskboard.html?teamNo='+teamNo
                            })
                        }
                    }, error: ()=>{alert('?')}
                })

            }
        })
    })

    $('span.s3').click(() => {
        Swal.fire({
            title: "3점을 선택하시겠습니까?",
            text: "이후 수정이 불가능합니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 3
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: `${backURL}/reviewtask`,
                    method: 'get',
                    data: `teamNo=${teamNo}&taskNo=${taskNo}&reviewScore=${score}`,
                    success: (responseJSONObj) => {
                        if (responseJSONObj.status == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) history(-1)
                            })
                        } else if (responseJSONObj.status == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) location.href = './taskboard.html?teamNo='+teamNo
                            })
                        }
                    }, error: ()=>{alert('?')}
                })

            }
        })
    })

    $('span.s4').click(() => {
        Swal.fire({
            title: "4점을 선택하시겠습니까?",
            text: "이후 수정이 불가능합니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 4
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: `${backURL}/reviewtask`,
                    method: 'get',
                    data: `teamNo=${teamNo}&taskNo=${taskNo}&reviewScore=${score}`,
                    success: (responseJSONObj) => {
                        if (responseJSONObj.status == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) history(-1)
                            })
                        } else if (responseJSONObj.status == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) location.href = './taskboard.html?teamNo='+teamNo
                            })
                        }
                    }, error: ()=>{alert('?')}
                })

            }
        })
    })

    $('span.s5').click(() => {
        Swal.fire({
            title: "5점을 선택하시겠습니까?",
            text: "이후 수정이 불가능합니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 5
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: `${backURL}/reviewtask`,
                    method: 'get',
                    data: `teamNo=${teamNo}&taskNo=${taskNo}&reviewScore=${score}`,
                    success: (responseJSONObj) => {
                        if (responseJSONObj.status == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) history(-1)
                            })
                        } else if (responseJSONObj.status == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg
                            }).then((result) => {
                                if (result.isConfirmed) location.href = './taskboard.html?teamNo='+teamNo
                            })
                        }
                    }, error: ()=>{alert('?')}
                })

            }
        })
    })

    const $img = $('div.teamProfile img.teamProfileImg')
    $.ajax({
        xhrFields: {
            responseType: "blob",
        },
        url: backURL + "/download",
        data: "teamNo=" + teamNo + "&opt=profile",
        success: (responseData) => {
            if (responseData.size > 0) {
                const url = URL.createObjectURL(responseData);
                $img.attr('src', url)
                $img.parent().show()
            }
        },
        error: (jqxhr) => { },
    });

})