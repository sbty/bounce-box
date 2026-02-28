# 🎮 Bounce Box

ECS（Entity Component System）アーキテクチャで作った
TypeScript製のシンプルなビジュアルトイ。

## デモ

🔗 [Play Here](https://あなたのユーザー名.github.io/bounce-box/)

## 操作方法

| 操作 | アクション |
|---|---|
| クリック | ボックスを3つ生成 |
| 右クリック | 全てのボックスを消す |

## ECS構成

```
Components: Position, Velocity, Size, Color
Systems:    SpawnSystem → MovementSystem → BounceSystem → RenderSystem
```

## 技術

- TypeScript（外部ライブラリなし）
- Canvas API
- ECS アーキテクチャ

## 開発

```bash
npm install
npm run build
npx serve .
```