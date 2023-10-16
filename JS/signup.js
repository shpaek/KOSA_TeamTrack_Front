$(() => {
	// 가입하기 버튼, id입력란 객체 찾기
	const $btSignup = $('form.signup>button[type=submit]')
	const $id = $('form.signup>input[name=id]')
	const $btDupchk = $('form.signup>button[type=button]')

	// ----- 중복확인 버튼 클릭했을대 할 일 START -----

	$btDupchk.click((e) => {
		e.preventDefault();

		// 입력 아이디 확인
		const idValue = $("#id").val();
		if (!idValue) {
			Swal.fire({
				icon: 'warning',
				text: '아이디를 입력하세요.'
			})
			return;
		}

		// 특수문자 검사
		const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
		if (specialCharacters.test(idValue)) {
			Swal.fire({
				icon: 'warning',
				text: '특수문자를 사용할 수 없습니다.'
			})
			return;
		}

		const englishAndNumbersOnly = /^[a-zA-Z0-9]+$/;
		if (!englishAndNumbersOnly.test(idValue)) {
			Swal.fire({
				icon: 'warning',
				text: '아이디는 영어와 숫자만 입력 가능합니다.'
			});
			return;
		}

		$.ajax({
			xhrFields: {
				withCredentials: true
			},
			url: 'http://192.168.1.20:8888/teamtrack/iddupcheck',
			method: 'get',
			// data : `id=${$id.val()}`,
			data: `id=${idValue}`,
			success: (responseJSONObj) => {
				if (responseJSONObj.status == 0) {
					// alert('이미 사용중인 아이디입니다.')
					Swal.fire({
						icon: 'warning',
						text: '이미 사용중인 아이디입니다.'
					})
				} else {
					Swal.fire({
						icon: 'success',
						text: '사용 가능한 아이디 입니다'
					})
					// alert('사용 가능한 아이디 입니다')
					$btSignup.show()
				} // if-else
			},
			error: (jqxhr) => {
				alert(jqxhr.status) // 정상처리가 되지 않으면 status = 0
			}
		})
	}) // $btDupChk.click
	// ----- 중복확인 버튼 클릭했을대 할 일 END -----

	// form객체 찾기
	const $form = $('div>form.signup')

	// ----- submit 이벤트 발생했을 때 할 일 START -----
	$form.submit((e) => {
		// form태그 내부의 객체 찾기
		const $pwdArr = $('form.signup>input[type=password]')
		const $nickname = $('form.signup>input[name=nickname]')
		const $name = $('form.signup>input[name=name]')
		const $birthday = $('form.signup>input[name=birth]')
		const $phone = $('form.signup>input[name=phone]')
		const $email = $('form.signup>input[name=email]')


		const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
		const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; // 간단한 이메일 유효성 검사 정규표현식
		// alert($nickname.val())

		if (!/^\d{11}$/.test($phone.val())) {
			Swal.fire({
				icon: 'warning',
				text: '휴대폰 번호는 11자리의 숫자여야 합니다.'
			});
			$phone.focus();
			$phone.select();
		} else if (/[^0-9]/.test($phone.val())) {
			Swal.fire({
				icon: 'warning',
				text: '휴대폰 번호에는 숫자만 입력하세요.'
			});
			$phone.focus();
			$phone.select();
		} else if (!strongPassword($pwdArr.eq(0).val())) {
			Swal.fire({
				icon: 'warning',
				text: '비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.'
			})
			$pwdArr.eq(0).focus();
			$pwdArr.eq(0).select();
		} else if ($pwdArr.eq(0).val() !== $pwdArr.eq(1).val()) {
			Swal.fire({
				icon: 'warning',
				text: '비밀번호를 다시 입력하세요.'
			})
			$pwdArr.eq(0).focus();
			$pwdArr.eq(0).select();
		} else if (specialCharacters.test($name.val()) || specialCharacters.test($nickname.val())) {
			Swal.fire({
				icon: 'warning',
				text: '이름과 닉네임에 특수문자를 포함할 수 없습니다.'
			});
		} else if (!emailPattern.test($email.val())) {
			Swal.fire({
			  icon: 'warning',
			  text: '유효한 이메일 주소를 입력하세요.'
			});
		}  else {
			const formData = new FormData(e.target)

			$.ajax({
				// xhrFields: {
				//     withCredentials: true
				// },
				url: 'http://192.168.1.20:8888/teamtrack/signup',
				method: 'post',
				contentType: false,
				processData: false,
				data: formData, // 프로필 파일 업로드 같이하려고 FormData클래스 사용 
				// data: $form.serialize(), -> 프로필 파일 업로드 전 사용
				success: (responseJSONObj) => {
					console.log(responseJSONObj)
					// alert(responseJSONObj.msg);
					Swal.fire({
						icon: 'success',
						text: responseJSONObj.msg
					}).then((result) => {
						if (result.isConfirmed && responseJSONObj.status === 1) {
							location.href = './Intro.html';
						}
					});
				},
				error: (jqxhr) => {
					alert(jqxhr.status) // 정상처리가 되지 않으면 status = 0
				}

			}) // ajax

		} // if-esle

		return false // 기본 이벤트 핸들러를 막는 것과 같은 효과 발생

	}) //



	// ====================== 유효성 검사 ======================
	// 1. 아이디 입력창 정보 가져오기
	let elInputUsername = document.querySelector('#id');
	// 2. 성공 메시지 정보 가져오기
	let elSuccessMessage = document.querySelector('.success-message'); // div.success-message.hide
	// 3. 실패 메시지 정보 가져오기 (글자수 제한 4~12글자)
	let elFailureMessage = document.querySelector('.failure-message'); // div.failure-message.hide
	// 4. 실패 메시지2 정보 가져오기 (영어 또는 숫자)
	let elFailureMessageTwo = document.querySelector('.failure-message2'); // div.failure-message2.hide

	// 1. 비밀번호 입력창 정보 가져오기
	let elInputPassword = document.querySelector('#pwd1');
	// 2. 비밀번호 확인 입력창 정보 가져오기
	let elInputPasswordRetype = document.querySelector('#pwd2');
	// 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
	let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
	// 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
	let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide

	// 휴대폰 정보 가져오기
	let elInputphon = document.querySelector('#phone')

	// 아이디 글자 수 제한
	function idLength(value) {
		return value.length >= 6 && value.length <= 12
	}

	// 아이디 영어 또는 숫자만 가능
	function onlyNumberAndEnglish(str) {
		return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
	}

	// 비밀번호 8자 이상, 영문, 숫자, 특수문자 사용
	function strongPassword(str) {
		return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(str);
	}

	// 비밀번호 확인
	function isMatch(password1, password2) {
		return password1 === password2;
	}

	// 휴대폰번호 숫자만 입력가능
	function onlyNumber(str) {
		return /^[0-9]+$/.test(str);
	}

	// 아이디 입력 이벤트
	elInputUsername.onkeyup = function () {
		// 값을 입력한 경우
		if (elInputUsername.value.length !== 0) {
			// 영어 또는 숫자 외의 값을 입력했을 경우
			if (onlyNumberAndEnglish(elInputUsername.value) === false) {
				elSuccessMessage.classList.add('hide');
				elFailureMessage.classList.add('hide');
				elFailureMessageTwo.classList.remove('hide'); // 영어 또는 숫자만 가능합니다
			}
			// 글자 수가 4~12글자가 아닐 경우
			else if (idLength(elInputUsername.value) === false) {
				elSuccessMessage.classList.add('hide'); // 성공 메시지가 가려져야 함
				elFailureMessage.classList.remove('hide'); // 아이디는 4~12글자이어야 합니다
				elFailureMessageTwo.classList.add('hide'); // 실패 메시지2가 가려져야 함
			}
			// 조건을 모두 만족할 경우
			else if (idLength(elInputUsername.value) || onlyNumberAndEnglish(elInputUsername.value)) {
				elSuccessMessage.classList.remove('hide'); // 사용할 수 있는 아이디입니다
				elFailureMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
				elFailureMessageTwo.classList.add('hide'); // 실패 메시지2가 가려져야 함
			}
		}
		// 값을 입력하지 않은 경우 (지웠을 때)
		// 모든 메시지를 가린다.
		else {
			elSuccessMessage.classList.add('hide');
			elFailureMessage.classList.add('hide');
			elFailureMessageTwo.classList.add('hide');
		}
	}

	// 비밀번호 이벤트
	elInputPassword.onkeyup = function () {

		// console.log(elInputPassword.value);
		// 값을 입력한 경우
		if (elInputPassword.value.length !== 0) {
			if (strongPassword(elInputPassword.value)) {
				elStrongPasswordMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
			}
			else {
				elStrongPasswordMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
			}
		}
		// 값을 입력하지 않은 경우 (지웠을 때)
		// 모든 메시지를 가린다.
		else {
			elStrongPasswordMessage.classList.add('hide');
		}
	};

	// 비밀번호 확인 이벤트
	elInputPasswordRetype.onkeyup = function () {

		// console.log(elInputPasswordRetype.value);
		if (elInputPasswordRetype.value.length !== 0) {
			if (isMatch(elInputPassword.value, elInputPasswordRetype.value)) {
				elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려짐
			}
			else {
				elMismatchMessage.classList.remove('hide'); // 실패 메시지가 보여짐
			}
		}
		else {
			elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려짐
		}
	};

	// 휴대폰 유효성 검사  
	$('#phone').on('keyup', function () {
		var phone = document.getElementById("phone").value;
		var mismatchMessage = document.querySelector(".mismatch-phone");

		if (/^\d{11}$/.test(phone)) { // 11자리의 숫자만 허용
			mismatchMessage.style.display = "none"; // 숨김
		} else {
			if (/[^0-9]/.test(phone)) { // 숫자 이외의 문자가 있는 경우
				mismatchMessage.style.display = "block"; // 표시
			} else if (/^\d{9,}$/.test(phone)) {
				mismatchMessage.style.display = "block"; // 숫자 11자리 이상이면 표시
			} else {
				mismatchMessage.style.display = "none"; // 숫자가 11자리 아닌 경우 숨김
			}
		}
	});

	// 생년월일 유효성 검사  
	$('#birthday').on('keyup', function () {
		var phone = document.getElementById("birthday").value;
		var mismatchMessage = document.querySelector(".mismatch-birthday");

		if (/^\d{8}$/.test(phone)) { // 8자리의 숫자만 허용
			mismatchMessage.style.display = "none"; // 숨김
		} else {
			if (/[^0-9]/.test(phone)) { // 숫자 이외의 문자가 있는 경우
				mismatchMessage.style.display = "block"; // 표시
			} else if (/^\d{9,}$/.test(phone)) {
				mismatchMessage.style.display = "block"; // 9자리 숫자 이상이면 표시
			} else {
				mismatchMessage.style.display = "none";
			}
		}
	});

})