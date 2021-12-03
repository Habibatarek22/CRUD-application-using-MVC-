$("#add_user").submit(function (event) {
  alert("data inserted successfuly");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    //n:will return all data from this array, i: will return index from this array
    data[n["name"]] = n["value"];
  });

  console.log(data);

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("data updated successfully");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id"); //current user id from show.ejs data-id=<....> attribute

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    //user permission to delete the record
    if (confirm("do you really want to delete this data?")) {
      $.ajax(request).done(function (response) {
        alert("data deleted successfully");
        location.reload();
      });
    }
  });
}
