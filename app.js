const searchSong = () =>{
    const searchText= document.getElementById('search-field').value;
    const url =`https://api.lyrics.ovh/suggest/${searchText}`
    //console.log(url)

    //load Data
    fetch(url)
    .then(res => res.json())
    //.then(data => displaySong(data))   // Returns an object
    .then(data => displaySong(data.data))
    .catch(error => displayError('Something Went Wrong!! Try Again Later'));

}
// using Async Await

// const searchSong = async() =>{
//         const searchText= document.getElementById('search-field').value;
//         const url =`https://api.lyrics.ovh/suggest/${searchText}`
//         //console.log(url)
    
//         //load Data
//         const res= await fetch(url);
//         const data = await res.json();
//         //.then(data => displaySong(data))   // Returns an object
//         displaySong(data.data);
        
    
// }


const displaySong = songs =>{
    //console.log(songs);  //Songs Array
    const songList = document.getElementById('song-list')
    songList.innerHTML=''
    // songs.forEach(song => console.log(song.title));   // all songs  
    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className="single-result row align-items-center my-3 p-3"
        //songDiv.innerText= song.title;
        songDiv.innerHTML=`
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>    
               
            </div>
    `
     //'${song.artist.name}', '${song.title}' if single quotation is not used in this case , it will through an error because the parameter should be a String
        songList.appendChild(songDiv);
    });
}

//https://api.lyrics.ovh/v1/:artist/:title

// const getLyrics= (artist,title)=> {
//     //console.log(artist, title);
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     //console.log(url);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }

// Using Async await


const getLyrics= async (artist,title)=> {
    //console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    //console.log(url);
    try{
        const res = await fetch(url);
        const data = await res.json()
        displayLyrics(data.lyrics);

    }
    catch(error){
        //console.log(error)
        displayError("Sorry Couldn't Find The Lyrics")
    }


    // const res = await fetch(url);
    // const data = await res.json()
    //  displayLyrics(data.lyrics);
}
const displayLyrics = lyrics => {
    const lyricsId= document.getElementById('lyrics');
    lyricsId.innerText= lyrics;
}

const displayError = error => {
    const errorText= document.getElementById('error');
    errorText.innerText= error;
}