//
//  CYMainViewController.m
//  NativeAddRNProject
//
//  Created by Mr.GCY on 2018/11/19.
//  Copyright © 2018 Mr.GCY. All rights reserved.
//

#import "CYMainViewController.h"
#import "CYRNViewController.h"
@interface CYMainViewController ()

@end

@implementation CYMainViewController

- (void)viewDidLoad {
     [super viewDidLoad];
     self.title = @"原生页面";
}
- (IBAction)clickEnterRN1Event:(UIButton *)sender {
     CYRNViewController * rnVC = [[CYRNViewController alloc]init];
     rnVC.vcType = 1;
     [self.navigationController pushViewController:rnVC animated:YES];
}
- (IBAction)clickEnterRN2Event:(UIButton *)sender {
     CYRNViewController * rnVC = [[CYRNViewController alloc]init];
     rnVC.vcType = 2;
     [self.navigationController pushViewController:rnVC animated:YES];
}
- (IBAction)clickEnterRN3Event:(UIButton *)sender {
     CYRNViewController * rnVC = [[CYRNViewController alloc]init];
     rnVC.vcType = 3;
     [self.navigationController pushViewController:rnVC animated:YES];
}
- (IBAction)clickEnterAppEvent:(UIButton *)sender {
     CYRNViewController * rnVC = [[CYRNViewController alloc]init];
     rnVC.vcType = 4;
     [self.navigationController pushViewController:rnVC animated:YES];
}

@end
