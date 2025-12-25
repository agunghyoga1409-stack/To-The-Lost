let editTarget = null;

function addOrUpdateTask() {
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const kelas = document.getElementById("kelas").value;
    const matkul = document.getElementById("matkul").value;
    const tugas = document.getElementById("tugas").value;
    const deadline = document.getElementById("deadline").value;

    if (!nama || !nim || !deadline) {
        alert("Mohon lengkapi data penting!");
        return;
    }

    if (editTarget) {
        updateTask(editTarget, nama, nim, kelas, matkul, tugas, deadline);
    } else {
        createTask(nama, nim, kelas, matkul, tugas, deadline);
    }

    resetForm();
}

function createTask(nama, nim, kelas, matkul, tugas, deadline) {
    const task = document.createElement("div");
    task.className = "task";

    if (new Date() > new Date(deadline)) {
        task.classList.add("late");
    }

    task.innerHTML = `
        <p class="line1"><b>${nama}</b> (${nim}) - ${kelas}</p>
        <p class="line2">${matkul} | ${tugas}</p>
        <p class="line3"><small>Deadline: ${deadline}</small></p>

        <div class="actions">
            <button onclick="markDone(this)">Selesai</button>
            <button onclick="editTask(this)">Edit</button>
        </div>
    `;

    document.getElementById("todoList").appendChild(task);
}

function editTask(btn) {
    editTarget = btn.closest(".task");

    const [nama, nimKelas] = editTarget.querySelector(".line1").innerText.split(" (");
    const [nim, kelas] = nimKelas.replace(")", "").split(" - ");
    const [matkul, tugas] = editTarget.querySelector(".line2").innerText.split(" | ");
    const deadline = editTarget.querySelector(".line3").innerText.replace("Deadline: ", "");

    document.getElementById("nama").value = nama;
    document.getElementById("nim").value = nim;
    document.getElementById("kelas").value = kelas;
    document.getElementById("matkul").value = matkul;
    document.getElementById("tugas").value = tugas;
    document.getElementById("deadline").value = deadline;

    const btnSubmit = document.getElementById("submitBtn");
    btnSubmit.innerText = "💾 Simpan Perubahan";
    btnSubmit.style.background = "#16a34a";
}

function updateTask(task, nama, nim, kelas, matkul, tugas, deadline) {
    task.querySelector(".line1").innerHTML = `<b>${nama}</b> (${nim}) - ${kelas}`;
    task.querySelector(".line2").innerText = `${matkul} | ${tugas}`;
    task.querySelector(".line3").innerHTML = `<small>Deadline: ${deadline}</small>`;

    task.classList.remove("late");
    if (new Date() > new Date(deadline)) {
        task.classList.add("late");
    }

    editTarget = null;
}

function markDone(btn) {
    const task = btn.closest(".task");
    task.classList.remove("late");
    task.classList.add("done");
    document.getElementById("doneList").appendChild(task);

    showSuccess();
}


function showSuccess() {
    const overlay = document.getElementById("successOverlay");
    const sound = document.getElementById("successSound");

    overlay.classList.add("show");
    sound.currentTime = 0;
    sound.play();

    // auto close setelah 2.5 detik (opsional)
    setTimeout(() => {
        closeOverlay();
    }, 2500);
}

function closeOverlay() {
    const overlay = document.getElementById("successOverlay");
    overlay.classList.remove("show");
}


