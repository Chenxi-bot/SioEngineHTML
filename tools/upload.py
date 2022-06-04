# -*- coding: utf-8 -*-
import oss2

# 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
auth = oss2.Auth('LTAI5t7pkfXWGo28YUmRAG6T', 'gYnJ5rzpRfUYoBWZSwdOaDXBAopJEE')
# yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
# 填写Bucket名称。
bucket = oss2.Bucket(auth, 'https://oss-cn-beijing.aliyuncs.com', 'sioengine')

# 上传文件。
# 如果需要在上传文件时设置文件存储类型（x-oss-storage-class）和访问权限（x-oss-object-acl），请在put_object中设置相关Header。
# headers = dict()
# headers["x-oss-storage-class"] = "Standard"
# headers["x-oss-object-acl"] = oss2.OBJECT_ACL_PRIVATE
# 填写Object完整路径和字符串。Object完整路径中不能包含Bucket名称。
# result = bucket.put_object('exampleobject.txt', 'Hello OSS', headers=headers)
result = bucket.put_object_from_file('demo.json', 'resources\scenario\demo.json')

# HTTP返回码。
print('http status: {0}'.format(result.status))
# 请求ID。请求ID是本次请求的唯一标识，强烈建议在程序日志中添加此参数。
print('request_id: {0}'.format(result.request_id))
# ETag是put_object方法返回值特有的属性，用于标识一个Object的内容。
print('ETag: {0}'.format(result.etag))
# HTTP响应头部。
print('date: {0}'.format(result.headers['date']))            