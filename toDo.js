let input = document.querySelector("#inp");
let list = document.querySelector("#list");

input.addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        let task = e.currentTarget.value;
        if (task.trim() == "") {
            return;
        }
        let li = document.createElement("li");
        li.innerText = task;
        list.append(li);

        li.addEventListener("dblclick", function(e) {
            e.currentTarget.remove();
        })

        e.currentTarget.value = "";
    }
});
