async function query() {
  try {
    let response = await fetch(
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );
    if (response.ok) {
      let data = response.json();
      console.log(data);
    } else {
      console.error("Erreur du serveur : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

query();
