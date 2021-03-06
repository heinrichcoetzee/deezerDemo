import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, ArtistAndAlbums } from '../../interfaces/Album.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss'],
})
export class AlbumPageComponent implements OnInit {
  artist!: ArtistAndAlbums;
  artistId!: number;
  selectedAlbum!: Album | null;
  constructor(private api: ApiService, private ar: ActivatedRoute) {}

  async ngOnInit() {
    this.artistId = this.ar.snapshot.params.id;
    try {
      this.artist = await this.api.artistById(this.artistId);
      const [alb] = this.artist.albums;
      this.selectAlbum(alb.id);
    } catch (err) {}
  }

  async selectAlbum(albumId: number) {
    this.selectedAlbum = null;
    try{
    this.selectedAlbum = await this.api.albumById(albumId);
    }catch(err){}
    window.scrollTo(0,0);
  }
}
