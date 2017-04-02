import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../post.model';

@Component({
    selector: 'kg-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})


export class PostListComponent implements OnInit, OnDestroy {
    postsList: Post[] = [];

    private postsListSubscription: Subscription;

    constructor( private postService: PostService ) { }

    ngOnInit() {
        this.getPostsList();
    }

    ngOnDestroy() {
        // prevent memory leak
        if (this.postsListSubscription) {
            this.postsListSubscription.unsubscribe();
        }
    }

    getPostsList() {
        if (!this.postsListSubscription) {
            this.postsListSubscription = this.postService.getPosts()
                .subscribe( data => this.postsList = data );
        }
    }
}
