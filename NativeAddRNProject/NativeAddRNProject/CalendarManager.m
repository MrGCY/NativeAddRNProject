//
//  CalendarManager.m
//  rnAndN
//
//  Created by Shaoting Zhou on 2017/2/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTBridge.h>
#import <React/RCTLog.h>

NSString *const kEventEmitterManagerEvent  = @"EventEmitterManagerEvent";

@implementation CalendarManager

RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;
//指定原生模块在主线程执行
- (dispatch_queue_t)methodQueue
{
     return dispatch_get_main_queue();
}
// 接收传过来的 NSString
RCT_EXPORT_METHOD(addEventOne:(NSString *)name ){
  RCTLogInfo(@"接收传过来的NSString : %@", name);
}
// 接收传过来的 NSString + NSDictionary
RCT_EXPORT_METHOD(addEventTwo:(NSString *)name details:(NSDictionary *)details)
{
  RCTLogInfo(@"接收传过来的NSString+NSDictionary: %@ %@", name, details);
}

// 接收传过来的 NSString + date日期
RCT_EXPORT_METHOD(addEventThree:(NSString *)name date:(NSDate *)date)
{
   NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
   [formatter setDateFormat:@"yyyy-MM-dd"];
  RCTLogInfo(@"接收传过来的NSString+NSDictionary: %@ %@", name, [formatter stringFromDate:date]);
}

//  对外提供调用方法,演示Callback
RCT_EXPORT_METHOD(testCallbackEventOne:(NSString *)name callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"%@",name);
  NSArray *events=@[@"1", @"2", @"3",@"4"]; //准备回调回去的数据
  callback(@[[NSNull null],events]);
}

//Promises
//  对外提供调用方法,演示Promise使用
RCT_REMAP_METHOD(testCallbackEventTwo,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *events =@[@"one ",@"two ",@"three"];//准备回调回去的数据
  if (events) {
    resolve(events);
  } else {
    NSError *error=[NSError errorWithDomain:@"我是Promise回调错误信息..." code:101 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}

- (NSDictionary *)constantsToExport
{
  return @{ @"ValueOne": @"我是从原生定义的~",
            @"EventEmitterManagerEvent":kEventEmitterManagerEvent
            };
}

//给 JavaScript 端发送事件
// 等 RN组件 监听事件通知后 在发送事件通知
RCT_EXPORT_METHOD(postNotificationEvent:(NSString *)name)
{
     RCTLogInfo(@"postNotificationEvent->:%@",name);
     [self sendEventWithName:kEventEmitterManagerEvent body:name];
}
//定义通知事件名称
- (NSArray<NSString *> *)supportedEvents
{
     return @[kEventEmitterManagerEvent];
}

- (void)calendarEventReminderReceived
{
     [self sendEventWithName:kEventEmitterManagerEvent body:@{@"name": @"高晨阳"}];
}

@end
