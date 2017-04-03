import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    from: string = '2015-01-01';
    to: string = '2015-03-01';

    rangeForm: FormGroup;

    // checks valid days and months, does not check leap year
    private isoDatePattern: RegExp = /^(19|20)\d\d-(02-(0[1-9]|[12]\d)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30))$/;

    private paramsSubscription: Subscription;
    private postsDetailSubscription: Subscription;
    private trackersSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private trackerService: TrackerService,
    ) { }

    ngOnInit() {
        this.rangeForm = new FormGroup({
            from: new FormControl( this.from, [
                Validators.required,
                Validators.pattern(this.isoDatePattern)
            ]),
            to: new FormControl( this.to, [
                Validators.required,
                Validators.pattern(this.isoDatePattern)
            ])
        });

        this.rangeForm.valueChanges
             .subscribe(data => {
                 if (this.rangeForm.valid) {
                     this.getTrackers(data.from, data.to);
                 }
             });

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
        if (this.trackersSubscription) {
            this.trackersSubscription.unsubscribe();
        }

        this.trackersSubscription = this.trackerService.getTrackers(from, to)
            .subscribe( data => this.trackersList = data );
    }

}
