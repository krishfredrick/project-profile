document.addEventListener("click", function (event) {
  if (event.target.classList.contains("submit")) {
    event.preventDefault();


    if (userName.value === "") {
      alert("Please enter Credentials");
      return;
    }

    axios
      .post("/api/v1/auth/profile", )
      .then((res) => {
        if (res.data.status !== 201) {
          alert(res.data.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
})