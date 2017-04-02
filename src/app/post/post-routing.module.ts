import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: PostListComponent
            },
            {
                path: ':id',
                component: PostDetailComponent
            }
        ])
    ],
        exports: [
            RouterModule
    ]
})

export class PostRoutingModule {}
