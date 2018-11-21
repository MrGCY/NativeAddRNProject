//
//  CYRN1ViewController.m
//  NativeAddRNProject
//
//  Created by Mr.GCY on 2018/11/19.
//  Copyright © 2018 Mr.GCY. All rights reserved.
//

#import "CYRNViewController.h"
#import <React/RCTRootView.h>
#import "CalendarManager.h"

@interface CYRNViewController ()

@end

@implementation CYRNViewController

- (void)viewDidLoad {
     [super viewDidLoad];
     switch (self.vcType) {
          case 1:
          {
               self.title = @"RN-1页面";
               [self loadFirstRNView];
          }
               break;
          case 2:
          {
               self.title = @"RN-2页面";
               [self loadSecondRNView];
          }
               break;
          case 3:
          {
               self.title = @"RN-3页面";
               [self loadThirdRNView];
          }
               break;
          case 4:
          {
               UIBarButtonItem * rightBtnItem = [[UIBarButtonItem alloc] initWithTitle:@"通知RN" style:UIBarButtonItemStyleDone target:self action:@selector(clickSendNotification)];
               self.navigationItem.rightBarButtonItem = rightBtnItem;
               self.title = @"app页面";
               [self loadAppRNView];
          }
               break;
          default:
               break;
     }
}
-(void)clickSendNotification{
     
}
-(void)loadFirstRNView{
     NSString * strUrl = @"http://localhost:8081/index.bundle?platform=ios&dev=true";
     NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
     
     RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"firstView"
                                                   initialProperties:nil
                                                       launchOptions:nil];
     self.view = rootView;
}
-(void)loadSecondRNView{
     NSString * strUrl = @"http://localhost:8081/index.bundle?platform=ios&dev=true";
     NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
     
     RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"secondView"
                                                   initialProperties:nil
                                                       launchOptions:nil];
     rootView.frame = CGRectMake(0, 88, self.view.frame.size.width, self.view.frame.size.height - 88);
     [self.view addSubview:rootView];
}
-(void)loadThirdRNView{
     NSString * strUrl = @"http://localhost:8081/index.bundle?platform=ios&dev=true";
     NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
     
     RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"thirdView"
                                                   initialProperties:nil
                                                       launchOptions:nil];
     rootView.frame = CGRectMake(0, 88, self.view.frame.size.width, self.view.frame.size.height - 88);
     [self.view addSubview:rootView];
}
-(void)loadAppRNView{
     NSString * strUrl = @"http://localhost:8081/index.bundle?platform=ios&dev=true";
     NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
     
     RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"nativeAddRN"
                                                   initialProperties:nil
                                                       launchOptions:nil];
     self.view = rootView;
}
@end
