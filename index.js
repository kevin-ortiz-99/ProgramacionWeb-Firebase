var firebaseConfig = {
    apiKey: "AIzaSyAmU7JzfizwVU3tS1l35HXJuLaqeACg2tQ",
    authDomain: "consultori.firebaseapp.com",
    databaseURL: "https://consultori-default-rtdb.firebaseio.com",
    projectId: "consultori",
    storageBucket: "consultori.appspot.com",
    messagingSenderId: "172079604356",
    appId: "1:172079604356:web:4a78a43412743065ebd8d1",
    measurementId: "G-0KG5TCGVVV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
    document.getElementById("Input5").value = '';
    document.getElementById("Input6").value = '';
    document.getElementById("Input7").value = '';
    document.getElementById("Input8").value = '';

}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var fecha = document.getElementById("Input2").value;
    var nombre  = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;
    var edad = document.getElementById("Input5").value;

    var peso = document.getElementById("Input6").value;
    var enfermedades = document.getElementById("Input7").value;
    var alergias = document.getElementById("Input8").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var paciente = {
            id, //matricula:id
            fecha,
            nombre ,
            genero,
            edad,
            peso,
            enfermedades,
            alergias,
        }

        //console.log(paciente);

        firebase.database().ref('Pacientes/' + id).update(paciente).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");
        $('#exampleModal').modal('hide');


    }
    else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;
    //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es


    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('pacientes').push().key;
    //data[`pacientes/${key}`]= paciente;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read() {
    document.getElementById("Table1").innerHTML = '';

    var ref = firebase.database().ref('Pacientes');
    /**   
       ref.on('value', function(snapshot) {
            snapshot.forEach(row=>{
                printRow(row.val());
            })
        });
     */

    ref.on("child_added", function (snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(paciente) {

    if (paciente != null) {
        var table = document.getElementById("Table1");

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);


        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = paciente.id;
        cell2.innerHTML = paciente.fecha;
        cell3.innerHTML = paciente.nombre ;
        cell4.innerHTML = paciente.genero;
        cell5.innerHTML = paciente.edad;
        cell6.innerHTML = paciente.peso;
        cell7.innerHTML = paciente.enfermedades;
        cell8.innerHTML = paciente.alergias;
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${paciente.id})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + paciente.id + ')">Modificar</button>';
    }
}

function deleteR(id) {
    firebase.database().ref('Pacientes/' + id).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id) {
    var ref = firebase.database().ref('Pacientes/' + id);
    ref.on('value', function (snapshot) {
        updateR(snapshot.val());
    });
    $('#exampleModal').modal('show');

}

function updateR(paciente) {
    if (paciente != null) {
        document.getElementById("Input1").value = paciente.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = paciente.fecha;
        document.getElementById("Input3").value = paciente.nombre ;
        document.getElementById("Input4").value = paciente.genero;
        document.getElementById("Input5").value = paciente.edad;
        document.getElementById("Input6").value = paciente.peso;
        document.getElementById("Input7").value = paciente.enfermedades;
        document.getElementById("Input8").value = paciente.alergias;
    }
}


//Para consulta de genero
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input2").value;

    var ref = firebase.database().ref("Pacientes");
    ref.orderByChild("fecha").equalTo(c).on("child_added", function (snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(paciente) {

    var table = document.getElementById("Table2");

    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = paciente.id;
    cell2.innerHTML = paciente.fecha;
    cell3.innerHTML = paciente.nombre ;
    cell4.innerHTML = paciente.genero;
    cell5.innerHTML = paciente.edad;
    cell6.innerHTML = paciente.peso;
    cell7.innerHTML = paciente.enfermedades;
    cell8.innerHTML = paciente.alergias;

}