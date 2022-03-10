let collection;
async function initMongo() {
    const app = new Realm.App({ id: 'application-0-kusvt' });
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    const mongo = app.currentUser.mongoClient('mongodb-atlas');
    collection = mongo.db('SchoolDB').collection('Stories');
}
initMongo()


$('#formClear').click(() => {
    $('.formitem').toArray().forEach(elem => elem.value = "")
})

function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            img = new Image();
            img.src = reader.result
            img.onload = () => {
                resolve(compress(img))
            }

        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
            reject(error)
        };
    })
}
const compress = function(source_img_obj) {
    console.log(source_img_obj)
    var mime_type = "image/jpeg";
    var cvs = document.createElement('canvas');
    let width = 800;
    let height = width / source_img_obj.naturalWidth * source_img_obj.naturalHeight;
    cvs.width = width;
    cvs.height = height;
    cvs.getContext("2d").drawImage(source_img_obj, 0, 0, width, height);
    return cvs.toDataURL(mime_type, 0.8);

}
$('#formSubmit').click(async(e) => {
        e.preventDefault()
        let formItems = $('.formitem').toArray()
        let values = formItems.map(elem => elem.value)
        if (!values.every((val, index) => !index || val)) {
            window.alert('Make sure to fill out all the required fields!')
        }
        // upload to database
        let imageBase64 = await getBase64(formItems[2].files[0])

        let doc = {
            name: formItems[0].value || 'Anonymous',
            title: formItems[1].value,
            image: imageBase64,
            description: formItems[3].value

        }
        console.log(doc)
            // return
        await collection.insertOne(doc).then((res) => {
            console.log(res)
            let postId = res.insertedId.toString();
            window.alert('Added your story!')
        }).catch(() => {
            window.alert('Uh Oh! Something went wrong. Please refresh and try again.')
        })

    })
    // https://github.com/brunobar79/J-I-C/blob/master/src/JIC.js