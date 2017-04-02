import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from '../post.service';
import { TrackerService } from '../tracker.service';

import { Post } from '../post.model';
import { Tracker } from '../tracker.model';

@Component({
  selector: 'kg-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
    postDetail: Post[] = [];
    trackersList: Tracker[] = [];
    from: string = '01-01-2015';
    to: string = '03-01-2015';

    private paramsSubscription: Subscription;
    private postsDetailSubscription: Subscription;
    private trackersSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private trackerService: TrackerService,
    ) { }

    ngOnInit() {
        if (!this.paramsSubscription) {
            this.paramsSubscription = this.route.params
            .subscribe(params => {
                this.getPostsDetail(params['id']);
            });
        }

        this.getTrackers(this.from, this.to);
    }

    ngOnDestroy() {
        // prevent memory leak
        if (this.postsDetailSubscription) {
            this.postsDetailSubscription.unsubscribe();
        }

        if (this.trackersSubscription) {
            this.trackersSubscription.unsubscribe();
        }
    }

    getPostsDetail(id: number) {
        if (!this.postsDetailSubscription) {
            this.postsDetailSubscription = this.postService.getPost(id)
                .subscribe( data => this.postDetail = data );
        }
    }

    getTrackers(from: string, to: string) {
        if (!this.trackersSubscription) {
            this.trackersSubscription = this.trackerService.getTrackers(from, to)
                .subscribe( data => this.trackersList = data );
        }
    }

}
