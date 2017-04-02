import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from '../post.service';

import { Post } from '../post.model';

@Component({
  selector: 'kg-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
    postDetail: Post[] = [];

    private paramsSubscription: Subscription;
    private postsDetailSubscription: Subscription;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (!this.paramsSubscription) {
            this.paramsSubscription = this.route.params
            .subscribe(params => {
                this.getPostsDetail(params['id']);
            });
        }
    }

    ngOnDestroy() {
        // prevent memory leak
        if (this.postsDetailSubscription) {
            this.postsDetailSubscription.unsubscribe();
        }
    }

    getPostsDetail(id: number) {
        if (!this.postsDetailSubscription) {
            this.postsDetailSubscription = this.postService.getPost(id)
                .subscribe( data => this.postDetail = data );
        }
    }

}
