import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { TrackerService } from './tracker.service';
import { PostService } from './post.service';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      PostComponent,
      PostListComponent,
      PostDetailComponent
  ],
  providers: [
      PostService,
      TrackerService
  ],
  exports: [
      PostComponent
  ]
})
export class PostModule { }
