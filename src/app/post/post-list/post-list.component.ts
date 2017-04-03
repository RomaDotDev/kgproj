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
    postsLoading: boolean = false;

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

    // TODO: data fetch error handling

    getPostsList() {
        // TODO: pagination
        if (!this.postsListSubscription) {
            this.postsLoading = true;
            this.postsListSubscription = this.postService.getAllPosts()
                .subscribe( data => {
                    this.postsList = data;
                    this.postsLoading = false;
                });
        }
    }
}
