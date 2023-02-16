function ok() {
    console.log(arguments[0].all_data);

}


function notok() {
    console.log('ne ok');
}


loadZip('http://api.foroom.ru/uploads/download/zip/data.zip', ok, notok);