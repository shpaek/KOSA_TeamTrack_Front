const backURL = 'http://localhost:8888/KOSA_TeamTrack_Back';
const frontURL = 'http://localhost:5500/HTML';
// const teamNo = location.search.substring(1).split('=')[1];
const teamNo = 9999;
// const id = 'psh2023';

function ajaxHandler(method, u, target) {
    console.log(u);

    if (method === 'GET') {
        target.load(u, function (response, status, xhr) {
            if (status === "error") {
                alert(xhr.status + " " + xhr.statusText);
            }
        });
    }
}

$(() => {

    $.ajax({
        url: `${backURL}/teamselectexaminer`,
        type: 'GET',
        data: `teamNo=${teamNo}`,
        success: (responseJSONObj) => {

            // 팀원 목록
            if (responseJSONObj.teamInfo != null) {
                const list = responseJSONObj.teamInfo;
                const $memberDiv = $('div.memberDiv').first()

                list.forEach((info, index) => {
                    const id = info.ID
                    const nickname = info.NICKNAME

                    const $memberCloneDiv = $memberDiv.clone()

                    $memberCloneDiv.find('').text(id)
                    $memberCloneDiv.find('').text(id)
                    $memberCloneDiv.find('').text(id)

                    $memberDiv.parent().append($memberCloneDiv)
                }); // forEach
            } // if

        },
        error: (jqXHR, textStatus) => {
            alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            console.log(jqXHR)
        }
    }) // ajax

});
