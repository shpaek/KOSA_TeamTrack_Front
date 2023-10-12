// const backURL = 'http://localhost:8888/KOSA_TeamTrack_Back';
// const frontURL = 'http://localhost:5500/HTML';
// const teamNo = location.search.substring(1).split('=')[1];
const teamNo1 = 9999;
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
    console.log("Document is ready!"); // 페이지 로딩 확인

    $.ajax({
        url: `http://localhost:8888/KOSA_TeamTrack_Back/teamselectexaminer`,
        type: 'GET',
        data: `teamNo=${teamNo1}`,
        success: (responseJSONObj) => {
            console.log("Ajax Success!"); // AJAX 호출 성공 확인

            if (responseJSONObj && responseJSONObj.teamInfo) {
                console.log("Found teamInfo!"); // teamInfo 객체 확인

                const list = responseJSONObj.teamInfo;
                const $memberDiv = $('div.memberDiv').first();

                list.forEach((info, index) => {
                    console.log(`Processing member: ${info.ID}`); // 각 회원 정보 처리 확인

                    const id = info.ID;
                    const nickname = info.NICKNAME;

                    const $memberCloneDiv = $memberDiv.clone();

                    $memberCloneDiv.find('input[type="radio"]').val(id).attr('id', `memberId${index}`);
                    $memberCloneDiv.find('span[class=memberId]').text(id);
                    $memberCloneDiv.find('span[class=memberNickname]').text(nickname);

                    $memberDiv.parent().append($memberCloneDiv);
                });
            } else {
                console.log("teamInfo not found!");
            }
        },
        error: (jqXHR, textStatus) => {
            alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
            console.error(jqXHR);
        }
    });
});